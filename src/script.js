const buttonList = [
  {
    id: "clear",
    value: "AC",
    type: "clear"
  },
  {
    id: "divide",
    value: "/",
    type: "operator"
  },
  {
    id: "multiply",
    value: "*",
    type: "operator"
  },
  {
    id: "seven",
    value: "7",
    type: "number"
  },
  {
    id: "eight",
    value: "8",
    type: "number"
  },
  {
    id: "nine",
    value: "9",
    type: "number"
  },
  {
    id: "subtract",
    value: "-",
    type: "operator"
  },
  {
    id: "four",
    value: "4",
    type: "number"
  },
  {
    id: "five",
    value: "5",
    type: "number"
  },
  {
    id: "six",
    value: "6",
    type: "number"
  },
  {
    id: "add",
    value: "+",
    type: "operator"
  },
  {
    id: "one",
    value: "1",
    type: "number"
  },
  {
    id: "two",
    value: "2",
    type: "number"
  },
  {
    id: "three",
    value: "3",
    type: "number"
  },
  {
    id: "zero",
    value: "0",
    type: "number"
  },
  {
    id: "decimal",
    value: ".",
    type: "decimal"
  },
  {
    id: "equals",
    value: "=",
    type: "equals"
  }
];

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: "0",
      previousButton: { value: "0", type: "number" },
      formula: "0",
      decimal: false
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleNumber = this.handleNumber.bind(this);
    this.handleOperator = this.handleOperator.bind(this);
    this.handleDecimal = this.handleDecimal.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleEquals = this.handleEquals.bind(this);
  }

  handleNumber(value, type) {
    // no leading 0
    let current = this.state.current;
    let formula = this.state.formula;
    if (this.state.current == "0") {
      current = "";
    } else if (this.state.previousButton.type == "equals") {
      current = "";
      formula = "0";
    }

    this.setState({
      current: current + value,
      previousButton: { value: value, type: type },
      formula: formula
    });
  }

  handleOperator(value, type) {
    let current = this.state.current;
    let previousButton = this.state.previousButton;
    let formula = this.state.formula;
    let decimal = this.state.decimal;

    // no leading 0s
    if (formula == "0") {
      formula = "";
    }

    switch (previousButton.type) {
      case "number":
      case "decimal":
        formula += current;
        current = value;
        break;
      case "operator":
        if (current.length == 1 && value == "-") {
          current += value;
        } else {
          current = value;
        }
        break;
      case "equals":
        formula = current;
        current = value;
    }

    this.setState({
      current: current,
      previousButton: { value: value, type: type },
      formula: formula,
      decimal: false
    });
  }

  handleDecimal(value, type) {
    // no double decimals
    if (!this.state.decimal) {
      this.setState({
        current: this.state.current + value,
        previousButton: { value: value, type: type },
        decimal: true
      });
    }
  }

  handleClear() {
    this.setState({
      current: "0",
      formula: "0",
      previousButton: { value: "0", type: "number" },
      decimal: false
    });
  }

  handleEquals(value, type) {
    let fullFormula = this.state.formula;
    if (
      this.state.previousButton.type == "number" ||
      this.state.previousButton.type == "decimal"
    ) {
      fullFormula += this.state.current;
    }

    let solution = eval(fullFormula);

    this.setState({
      current: solution,
      formula: fullFormula,
      previousButton: { value: value, type: type },
      decimal: false
    });
  }

  handleInput(value, type) {
    switch (type) {
      case "number":
        this.handleNumber(value, type);
        break;
      case "operator":
        this.handleOperator(value, type);
        break;
      case "decimal":
        this.handleDecimal(value, type);
        break;
      case "clear":
        this.handleClear();
        break;
      case "equals":
        this.handleEquals(value, type);
        break;
    }
  }

  render() {
    return (
      <div className="border calculator">
        <div className="display text-end">
          <div className="formula" id="formula">
            {this.state.formula}
          </div>
          <div className="output" id="display">
            {this.state.current}
          </div>
        </div>
        <div className="buttons">
          {buttonList.map((btn, index) => (
            <button
              id={btn.id}
              class={"border btn " + btn.type}
              onClick={() => this.handleInput(btn.value, btn.type)}
            >
              {btn.value}
            </button>
          ))}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Calculator />, document.getElementById("app"));
