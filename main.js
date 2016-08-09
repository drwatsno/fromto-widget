class DropdownSW {
    constructor(node) {
        this._rootNode = node;
        this.avaibleValues = JSON.parse(node.dataset.avaibleValues).sort().reverse();
        this._switcherLeft = node.querySelector(".drp-b_switcher-cols-col-left");
        this._switcherLeftInput = node.querySelector(".input-switcher_left input");
        this._switcherRight = node.querySelector(".drp-b_switcher-cols-col-right");
        this._switcherRightInput = node.querySelector(".input-switcher_right input");
        this._formatField = node.querySelector(".drp-e_f-value");
    }

    dropDownStateOpen() {
        this._rootNode.classList.add("dropdown-opened");

        this.fillLeftCol();
    }

    dropDownStateClose() {
        this._rootNode.classList.remove("dropdown-opened");
    }

    fillLeftCol() {
        var _this = this;

        console.log(this._switcherLeft);

        this._switcherLeft.querySelector(".drp-b_switcher-avaible_vals").innerHTML = "";

        this.avaibleValues.forEach(function (elemVal) {
            _this._switcherLeft.querySelector(".drp-b_switcher-avaible_vals").insertAdjacentHTML('afterBegin',`
                    <li class="value-item" data-val="${elemVal}">${elemVal}</li>
                `);
        });

        this._switcherLeftInput.focus();
    }

    fillRightCol(fromValue) {
        var _this = this;

        var vals = this.avaibleValues.filter(function (elem) {
            return elem > fromValue
        });

        this._switcherRight.querySelector(".drp-b_switcher-avaible_vals").innerHTML = "";

        vals.forEach(function (elemVal) {
            _this._switcherRight.querySelector(".drp-b_switcher-avaible_vals").insertAdjacentHTML('afterBegin',`
                    <li class="value-item" data-val="${elemVal}">${elemVal}</li>
                `);
        });

        _this._switcherRightInput.focus();
    }
    
    formatValue () {
        this._formatField.innerHTML = this._switcherLeftInput.value + ' - ' + this._switcherRightInput.value;
    }
    
    init() {
        var _this = this;

        _this._rootNode.querySelector(".drp-b_button-wrap").addEventListener("click", function (event) {
            if (_this._rootNode.classList.contains("dropdown-opened")) {
                _this.dropDownStateClose();
            } else {
                _this.dropDownStateOpen();
            }
        });

        _this._switcherLeft.addEventListener("click", function (event) {
            if (event.target.classList.contains("value-item")) {
                _this._switcherLeftInput.setAttribute("value", event.target.dataset.val);

                _this.fillRightCol(_this._switcherLeftInput.value);
            }
        });

        _this._switcherRight.addEventListener("click", function (event) {
            if (event.target.classList.contains("value-item")) {
                _this._switcherRightInput.setAttribute("value", event.target.dataset.val);

                _this.formatValue();

                _this.dropDownStateClose();
            }
        });
    }
    
}

var dropdown = new DropdownSW(document.querySelector(".drp-b_root"));

dropdown.init();