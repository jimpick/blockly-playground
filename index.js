/**
 * @license
 * 
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Example of including Blockly using the UMD bundle
 * @author samelh@google.com (Sam El-Husseini)
 */

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
        .appendField(new Blockly.FieldDropdown([["bytes","BYTES"], ["kB","KB"], ["kiB","KIB"], ["MB","MB"], ["MiB","MIB"], ["GB","GB"], ["GiB","GIB"]]), "METRIC");
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

  Blockly.JavaScript['generate_random_blob'] = function(block) {
      var value_name = Blockly.JavaScript.valueToCode(
        block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC
      ).replace('(', '').replace(')', '')
      function run (value_name) {
        const lastFunc = context.lastHandler[context.lastHandler.length - 1]
        context.lastHandler[context.lastHandler.length - 1] =
          async function () {
            await lastFunc()
            console.log('Generate random blob:', value_name)
            return {
              file: 'blob_' + value_name.replace(/ /g, '_') + '.bin'
            }
          }
      }
      var code = `// Generate random blob: ${value_name}\n\n` +
        ';(' + run.toString().replace('run (', '(') + ')' +
        `('${value_name}')\n\n`
      return code;
  };

  Blockly.JavaScript['sizer'] = function(block) {
    var number_size = block.getFieldValue('SIZE');
    var dropdown_metric = block.getFieldValue('METRIC');
    var code = `${number_size} ${dropdown_metric}`;
    return [code, Blockly.JavaScript.ORDER_NONE];
  };

  Blockly.JavaScript['ipfs_add'] = function(block) {
      function run (value_name) {
        const lastFunc = context.lastHandler[context.lastHandler.length - 1]
        context.lastHandler[context.lastHandler.length - 1] =
          async function () {
            const { file } = await lastFunc()
            console.log('ipfs add', file)
            return {
              cid: '12345'
            }
          }
      }
      var code = `// ipfs add\n\n` +
        ';(' + run.toString().replace('run (', '(') + ')' +
        `()\n\n`
      return code;
  };

  Blockly.JavaScript['write_cid_to_pubsub_topic'] = function(block) {
      var text_name = block.getFieldValue('NAME');
      // TODO: Assemble JavaScript into code variable.
      var code = `// write <cid> to pubsub topic ${text_name}\n\n`
      return code;
  };

  Blockly.JavaScript['read_cid_from_pubsub_topic'] = function(block) {
      var text_name = block.getFieldValue('NAME');
      // TODO: Assemble JavaScript into code variable.
      var code = `// read <cid> from pubsub topic ${text_name}\n\n`
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
          '  handler().then(() => {\n' +
          '    console.log("after context", context)\n' +
          '  })\n' +
          '}\n'
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
