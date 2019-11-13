'use strict';
/*
function TextBox(props) {
  const number = Number(props.fontsize);
  return (
    <div id="container">
        <textarea id="content" style={{ fontSize: number }}></textarea>
        <div id="friend" style={{ fontSize: number }}></div>
        <img id="pageimage" src="/valknut.svg" width="100%" />
    </div>
  );
}*/

function PageImage(props) {
  return (
    <img id="pageimage" src={props.imgUrl} width="100%" />
  );
}

function TextBox(props) {
  const number = Number(props.fontsize);
  return (
    <div id="container">
        <textarea id="content" style={{ fontSize: number }} value={props.myNotes} onChange={props.onChange} />
        <div id="friend" style={{ fontSize: number }}>{props.friendNotes}</div>
        <PageImage imgUrl={props.imgUrl} />
    </div>
  );
}

function FontSlider(props) {
  const number = Number(props.fontsize);
  return (
    <div className="fontsize-slider">
      <div>Font Size: {number}</div>
      <input type="range" min="8" max="48" value={number} onChange={props.onChange} />
      <button onClick={props.onClick}>Reset to default</button>
    </div>
  );
}

class ParentComponent extends React.Component {
  state = {
    defaultSize: 18,
    fontsize: 18,
    myNotes: '',
    friendNotes: '',
    imgUrl: "/valknut.svg"
  }

  handleTyping = (event) => {
    const myNotes = event.target.value;
    this.setState({ myNotes });
  }

  setAnnotations = (a) => {
    console.log(a);
    if (a[0]['content'] !== null) {
        this.setState({ myNotes: a[0]['content'] });
    }
    if (a[1]['content'] !== null) {
        this.setState({ friendNotes: a[1]['content'] });
    }
  }

  handleImageChange = (newImg) => {
    const imgUrl = mewImg;
    this.setState({ imgUrl });
  }

  handleFontSizeChange = event => {
    const fontsize = event.target.value;
    this.setState({ fontsize });
  }

  handleReset = event => {
    const fontsize = this.state.defaultSize;
    this.setState({ fontsize });
  }

  render() {
    const fontsize = this.state.fontsize

    return (
      <div className="fontslider">
        <FontSlider onClick{this.handleReset} onChange={this.handleFontSizeChange} />
        <TextBox fontsize={fontsize} onChange={this.handleTyping} myNotes={this.state.myNotes} friendNotes={this.state.friendNotes} imgUrl={this.state.imgUrl} />
      </div>
    );
  }
}


//var myReactComponent = ReactDOM.render(React.createElement(FontSlider), document.getElementById('react-root'));
//export default FontSlider;
