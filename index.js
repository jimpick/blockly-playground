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

  /*
    var toolbox = document.getElementById('toolbox');
    var workspace = Blockly.inject('blocklyDiv',
        {
            comments: true,
            collapse: true,
            disable: true,
            grid:
            {
                spacing: 25,
                length: 3,
                colour: '#ccc',
                snap: true
            },
            toolbox: toolbox,
            zoom:
            {
                controls: true,
                wheel: true,
                startScale: 1.0,
                maxScale: 4,
                minScale: 0.25,
                scaleSpeed: 1.1
            }
        });
  */

 Blockly.Blocks['when_initial_peers_started'] = {
    init: function() {
      this.appendDummyInput()
          .appendField(new Blockly.FieldLabelSerializable("When initial peers started"), "NAME");
      this.setNextStatement(true, null);
      this.setColour(45);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };
  
  Blockly.Blocks['generate_random_file'] = {
    init: function() {
      this.appendValueInput("NAME")
          .setCheck("size")
          .appendField(new Blockly.FieldLabelSerializable("Generate random file"), "GEN RANDOM FILE");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(230);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };
  
  Blockly.Blocks['size_mb'] = {
    init: function() {
      this.appendDummyInput()
          .appendField(new Blockly.FieldNumber(1, 0), "SIZE")
          .appendField("MB");
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
  
  Blockly.Blocks['write_to_backchannel'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("Write to backchannel")
          .appendField(new Blockly.FieldTextInput("name"), "NAME");
      this.setPreviousStatement(true, null);
      this.setColour(230);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };
  
  Blockly.Blocks['write_cid_to_backchannel'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("Write cid to backchannel")
          .appendField(new Blockly.FieldTextInput("name"), "NAME");
      this.setPreviousStatement(true, null);
      this.setColour(230);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };
  
  Blockly.Blocks['read_cid_from_backchannel'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("Read CID from backchannel")
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

  Blockly.JavaScript['when_initial_peers_started'] = function(block) {
      // TODO: Assemble JavaScript into code variable.
      var code = '// When initial peers started\n\n' +
        'console.log("started")\n\n'
      return code;
  };

  Blockly.JavaScript['generate_random_file'] = function(block) {
      var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
      // TODO: Assemble JavaScript into code variable.
      var code = `// Generate random file: ${value_name}\n\n` +
        `context.file = '${value_name}'\n\n`
      return code;
  };

  Blockly.JavaScript['size_mb'] = function(block) {
      var number_size = block.getFieldValue('SIZE');
      // TODO: Assemble JavaScript into code variable.
      var code = `${number_size} MB`;
      // TODO: Change ORDER_NONE to the correct strength.
      return [code, Blockly.JavaScript.ORDER_NONE];
  };

  Blockly.JavaScript['ipfs_add'] = function(block) {
      // TODO: Assemble JavaScript into code variable.
      var code = '// ipfs add <cid>\n\n' +
        'context.cid = "abcd"\n\n'
      return code;
  };

  Blockly.JavaScript['write_cid_to_backchannel'] = function(block) {
      var text_name = block.getFieldValue('NAME');
      // TODO: Assemble JavaScript into code variable.
      var code = `// write <cid> to backchannel ${text_name}\n\n`
      return code;
  };

  Blockly.JavaScript['read_cid_from_backchannel'] = function(block) {
      var text_name = block.getFieldValue('NAME');
      // TODO: Assemble JavaScript into code variable.
      var code = `// read <cid> from backchannel ${text_name}\n\n`
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

  generateBtn = document.getElementById('generateBtn')
  generateBtn.addEventListener('click', () => {
    Blockly.JavaScript.addReservedWords('code');
    var code = Blockly.JavaScript.workspaceToCode(workspace);
    const codeEle = document.getElementById('code')
    codeEle.textContent = code
  })

  startBtn = document.getElementById('startBtn')
  startBtn.addEventListener('click', () => {
    Blockly.JavaScript.addReservedWords('code');
    var code = Blockly.JavaScript.workspaceToCode(workspace);
    const codeEle = document.getElementById('code')
    codeEle.textContent = code

    try {
      async function run () {
        code = 'let context = {}\n\n' + code + '\n\n' +
          'console.log("context", context)'
        eval(code)
      }
      run()
    } catch (e) {
      console.error(e)
    }
  })
});
