const ipfsPromise = window.Ipfs.create({
  EXPERIMENTAL: { pubsub: true }
})

document.addEventListener("DOMContentLoaded", function () {

  Blockly.Blocks['on_start'] = {
    init: function() {
      this.appendDummyInput()
          .appendField(new Blockly.FieldLabelSerializable("On start"), "NAME");
      this.setNextStatement(true, null);
      this.setColour(45);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };
  
  Blockly.Blocks['generate_random_blob'] = {
    init: function() {
      this.appendValueInput("NAME")
          .setCheck("size")
          .appendField(new Blockly.FieldLabelSerializable("Generate random blob"), "GEN RANDOM BLOB");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(230);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };
  
  Blockly.Blocks['sizer'] = {
    init: function() {
      this.appendDummyInput()
        .appendField(new Blockly.FieldNumber(1, 0), "SIZE")
        .appendField(new Blockly.FieldDropdown([["bytes","BYTES"], ["kB","KB"], ["kiB","KIB"], ["MB","MB"], ["MiB","MIB"]]), "METRIC");
        // .appendField(new Blockly.FieldDropdown([["bytes","BYTES"], ["kB","KB"], ["kiB","KIB"], ["MB","MB"], ["MiB","MIB"], ["GB","GB"], ["GiB","GIB"]]), "METRIC");
      this.setOutput(true, "size");
      this.setColour(0);
      this.setTooltip("");
      this.setHelpUrl("");
    }
  };

  Blockly.Blocks['ipfs_add'] = {
    init: function() {
      this.appendDummyInput()
        .appendField("ipfs add");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(230);
      this.setTooltip("");
      this.setHelpUrl("");
    }
  };
  
  Blockly.Blocks['write_cid_to_pubsub_topic'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("Write CID to pubsub topic")
          .appendField(new Blockly.FieldTextInput("name"), "NAME");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(230);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };
  
  Blockly.Blocks['read_cid_from_pubsub_topic'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("Read CID from pubsub topic")
          .appendField(new Blockly.FieldTextInput("name"), "NAME");
      this.setNextStatement(true, null);
      this.setColour(45);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };
  
  Blockly.Blocks['ipfs_get'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("ipfs get");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(230);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };
  
  Blockly.Blocks['wait_for_completion'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("Wait for completion");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(230);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };

  Blockly.JavaScript['on_start'] = function(block) {
    function run () {
      if (!handlers.start) handlers.start = []
      {
        const func = async function () {
          console.log("start")
        }
        handlers.start.push(func)
      }
      context.lastHandler = handlers.start
    }
    var code = '// On start\n\n' +
      ';(' + run.toString().replace('run (', '(') + ')()\n\n'
    return code;
  };

  Blockly.JavaScript['sizer'] = function(block) {
    var number_size = block.getFieldValue('SIZE');
    var dropdown_metric = block.getFieldValue('METRIC');
    // var code = `${number_size} ${dropdown_metric}`;
    let multiplier = 1
    switch (dropdown_metric) {
      case 'KB':
        multiplier = 1000
        break
      case 'KIB':
        multiplier = 1024
        break
      case 'MB':
        multiplier = Math.pow(1000, 2)
        break
      case 'MIB':
        multiplier = Math.pow(1024, 2)
        break
      case 'GB':
        multiplier = Math.pow(1000, 3)
        break
      case 'GIB':
        multiplier = Math.pow(1024, 3)
        break
    }
    var code = JSON.stringify({
      name: `${number_size} ${dropdown_metric}`,
      size: Number(number_size) * multiplier
    })
    return [code, Blockly.JavaScript.ORDER_NONE];
  };

  Blockly.JavaScript['generate_random_blob'] = function(block) {
      var value_name = Blockly.JavaScript.valueToCode(
        block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC
      )
      function run (value_name) {
        const lastFunc = context.lastHandler[context.lastHandler.length - 1]
        context.lastHandler[context.lastHandler.length - 1] =
          async function () {
            await lastFunc()
            const { name, size } = eval(value_name)
            const array = new Uint8Array(size)
            for (let i = 0; i < size; i += 65536) {
              const subarray = array.subarray(i, Math.min(65536, size - i))
              window.crypto.getRandomValues(subarray)
            }
            const buffer = window.Ipfs.Buffer.from(array)
            console.log('Generate random blob:', name)
            return { buffer }
          }
      }
      var code = `// Generate random blob: ${value_name}\n\n` +
        ';(' + run.toString().replace('run (', '(') + ')' +
        `('${value_name}')\n\n`
      return code;
  };

  Blockly.JavaScript['ipfs_add'] = function(block) {
      function run () {
        const lastFunc = context.lastHandler[context.lastHandler.length - 1]
        context.lastHandler[context.lastHandler.length - 1] =
          async function () {
            const { buffer } = await lastFunc()
            console.log('ipfs add', buffer)
            const result = await context.ipfs.add(buffer)
            const cid = result[0].hash
            console.log('CID:', cid)
            return { cid }
          }
      }
      var code = `// ipfs add\n\n` +
        ';(' + run.toString().replace('run (', '(') + ')' +
        `()\n\n`
      return code;
  };

  Blockly.JavaScript['write_cid_to_pubsub_topic'] = function(block) {
      var topic = block.getFieldValue('NAME');
      function run (topic) {
        const lastFunc = context.lastHandler[context.lastHandler.length - 1]
        context.lastHandler[context.lastHandler.length - 1] =
          async function () {
            const { cid } = await lastFunc()
            console.log('write cid to pubsub topic', topic, cid)
            const data = window.Ipfs.Buffer.from(cid)
            await context.ipfs.pubsub.publish(topic, data)
          }
      }
      var code = `// write cid to pubsub topic\n\n` +
        ';(' + run.toString().replace('run (', '(') + ')' +
        `('${topic}')\n\n`
      return code;
  };

  Blockly.JavaScript['read_cid_from_pubsub_topic'] = function(block) {
    var topic = block.getFieldValue('NAME');
    function run (topic) {
      if (!handlers.pubsub) handlers.pubsub = {}
      if (!handlers.pubsub[topic]) handlers.pubsub[topic] = []
      {
        const func = async function (msg) {
          console.log("received pubsub message on topic", topic, msg)
          const cid = msg.data.toString()
          console.log("cid:", cid)
          return { cid }
        }
        handlers.pubsub[topic].push(func)
      }
      context.lastHandler = handlers.pubsub[topic]
    }
    var code = `// read <cid> from pubsub topic ${topic}\n\n` +
      ';(' + run.toString().replace('run (', '(') + ')' +
      `('${topic}')\n\n`
    return code;
  };

  Blockly.JavaScript['ipfs_get'] = function(block) {
      // TODO: Assemble JavaScript into code variable.
      var code = `// ipfs get <cid>\n\n`
      return code;
  };

  Blockly.JavaScript['wait_for_completion'] = function(block) {
      // TODO: Assemble JavaScript into code variable.
      var code = `// wait for completion\n\n`
      return code;
  };

  /*
  generateBtn = document.getElementById('generateBtn')
  generateBtn.addEventListener('click', () => {
    Blockly.JavaScript.addReservedWords('code');
    var code = Blockly.JavaScript.workspaceToCode(workspace);
    const codeEle = document.getElementById('code')
    codeEle.textContent = code
  })
  */

  startBtn = document.getElementById('startBtn')
  startBtn.addEventListener('click', () => {
    Blockly.JavaScript.addReservedWords('code');
    var code = Blockly.JavaScript.workspaceToCode(workspace);
    // const codeEle = document.getElementById('code')
    // codeEle.textContent = code

    async function run () {
      try {
        code = 'let context = {}\n' +
          'let handlers = {}\n\n' +
          code + '\n\n' +
          'console.log("before context", context)\n\n' +
          'for (const handler of handlers.start) {\n' +
          '  ipfsPromise\n' +
          '    .then(node => {\n' +
          '      context.ipfs = node\n' +
          '    })\n' +
          '    .then(handler)\n' +
          '    .then(() => {\n' +
          '      console.log("after context", context)\n' +
          '    })\n' +
          '}\n'
        // console.log('code', code)
        eval(code)
      } catch (e) {
        console.error(e)
      }
    }
    run()
  })

  installBtn = document.getElementById('installBtn')
  installBtn.addEventListener('click', () => {
    Blockly.JavaScript.addReservedWords('code');
    var code = Blockly.JavaScript.workspaceToCode(workspace);
    console.log('Install handlers', code)
    // FIXME: Uninstall
    async function run () {
      try {
        code =
          'ipfsPromise.then(node => {\n' +
          '  let context = { ipfs: node }\n' +
          '  let handlers = {}\n\n' +
          code + '\n\n' +
          '  if (handlers.pubsub) {\n' +
          '    for (const topic of Object.keys(handlers.pubsub)) {\n' +
          '      for (const handler of handlers.pubsub[topic]) {\n' +
          '        console.log("installing handler for topic:", topic)\n' +
          '        context.ipfs.pubsub.subscribe(topic, async msg => {\n' +
          '          console.log("Before context:", context)\n' +
          '          handler(msg)\n' +
          '          console.log("After context:", context)\n' +
          '        })\n' +
          '      }\n' +
          '    }\n' +
          '  }\n' +
          '})'
        console.log('code', code)
        eval(code)
      } catch (e) {
        console.error(e)
      }
    }
    run()
  })

  var blocklyArea = document.getElementById('blocklyArea');
  var blocklyDiv = document.getElementById('blocklyDiv');
  var workspace = Blockly.inject(blocklyDiv,
      {toolbox: document.getElementById('toolbox')});
  var onresize = function(e) {
    // Compute the absolute coordinates and dimensions of blocklyArea.
    var element = blocklyArea;
    var x = 0;
    var y = 0;
    do {
      x += element.offsetLeft;
      y += element.offsetTop;
      element = element.offsetParent;
    } while (element);
    // Position blocklyDiv over blocklyArea.
    blocklyDiv.style.left = x + 'px';
    blocklyDiv.style.top = y + 'px';
    blocklyDiv.style.width = blocklyArea.offsetWidth + 'px';
    blocklyDiv.style.height = blocklyArea.offsetHeight + 'px';
    Blockly.svgResize(workspace);
  };
  window.addEventListener('resize', onresize, false);
  onresize();
  Blockly.svgResize(workspace);

});
