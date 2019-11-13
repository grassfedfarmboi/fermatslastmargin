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

class TextBox extends React.Component {
    state = {
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
            const newnotes =
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

    render() {
    const number = Number(this.props.fontsize);
    return (
        <div id="container">
            <textarea id="content" style={{ fontSize: number }} value={this.state.myNotes} onChange={this.handleTyping} />
            <div id="friend" style={{ fontSize: number }}>{this.state.friendNotes}</div>
            <PageImage imgUrl={this.state.imgUrl} />
        </div>
      );
    }
}

class FontSlider extends React.Component {
  state = {
    defaultSize: 18,
    fontsize: 18
  }

  handleFontSizeChange = event => {
    const fontsize = event.target.value;
    this.setState({ fontsize });
  }

  handleReset = event => {
    const fontsize = this.state.defaultSize;
    this.setState({ fontsize });
  }

  testFunction() {
    console.log("Test Function!")
  }

  render() {
    const fontsize = this.state.fontsize

    return (
      <div className="fontslider">
        <div className="fontsize-slider">
          <div>Font Size: {fontsize}</div>
          <input type="range" min="8" max="48" value={fontsize} onChange={this.handleFontSizeChange} />
          <button onClick={this.handleReset}>Reset to default</button>
        </div>
        <TextBox fontsize={fontsize} />
      </div>
    );
  }
}


//var myReactComponent = ReactDOM.render(React.createElement(FontSlider), document.getElementById('react-root'));
//export default FontSlider;
