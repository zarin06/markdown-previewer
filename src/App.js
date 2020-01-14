import React from 'react';
import marked from 'marked';
import highlight from 'highlight.js'
import './App.css';

const markDown = `### Headers

# Header 1
## Header 2
### Header 3

### Lists

- list one
- list two
- list three

### Links

[FreeCodeCamp](https://www.freecodecamp.org/learn/)

[Google](https://www.google.com)

### Text Decoration

*italic*

**bold**

***bold and italic***

### Images

![margot robbie](https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Margot_Robbie_%28cropped%29.jpg/170px-Margot_Robbie_%28cropped%29.jpg 'HARLEY QUINN !!!!!')

### Blockquote

> You Know nothing, John Snow !

### Code

\`npm install me\`

\`\`\`

function addMe(a,b) {
  return a+b;
}

\`\`\`

`;

const renderer = new marked.Renderer();

renderer.link = (href, title, text) => {
  return `<a href=${href} target="_blank">${text}</a>`
}

marked.setOptions({
  renderer: renderer,
  breaks: true,
  highlight: function(code) {
    return highlight.highlightAuto(code).value;
  }
});

class App extends React.Component {
  state = { input : markDown };

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  render() {
    return (
      <div className="bg">
        <div className="container">
          <h1 className="text-center mb-4 mt-2">Markdown Previewer</h1>
          <div className="row">
            <div className="col-md-6 left">
              <h3 className="text-center">Editor</h3>
              <textarea 
                className="form-control" 
                id="editor" 
                value={this.state.input}
                rows="18"
                onChange={this.onInputChange} 
              />
            </div>
            <div className="col-md-6 right">
              <h3 className="text-center">Preview</h3>
              <div id="preview" dangerouslySetInnerHTML={{ __html: marked(this.state.input) }} />
            </div>
          </div> 
        </div>
      </div>
    );
  }
}

export default App;