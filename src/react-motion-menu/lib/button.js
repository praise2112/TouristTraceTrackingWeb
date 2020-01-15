'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');
var _propTypes = require('prop-types');

var _react2 = _interopRequireDefault(_react);

var _reactMotion = require('react-motion');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MenuButton = function (_Component) {
  _inherits(MenuButton, _Component);

  function MenuButton(props) {
    _classCallCheck(this, MenuButton);

    var _this = _possibleConstructorReturn(this, (MenuButton.__proto__ || Object.getPrototypeOf(MenuButton)).call(this, props));

    _this.state = {
      sequence: 0
    };
    _this.sequenceParams = _this.props.bumpy ? [{
      scaleX: (0, _reactMotion.spring)(1, { stiffness: 1500, damping: 10 }),
      scaleY: (0, _reactMotion.spring)(1, { stiffness: 1500, damping: 10 })
    }, {
      scaleX: (0, _reactMotion.spring)(0.6, { stiffness: 1500, damping: 50 }),
      scaleY: (0, _reactMotion.spring)(0.6, { stiffness: 1500, damping: 50 })
    }, {
      scaleX: (0, _reactMotion.spring)(1, { stiffness: 1500, damping: 10 }),
      scaleY: (0, _reactMotion.spring)(1, { stiffness: 1500, damping: 10 })
    }] : [{
      scaleX: (0, _reactMotion.spring)(1, { stiffness: 1500, damping: 10 }),
      scaleY: (0, _reactMotion.spring)(1, { stiffness: 1500, damping: 10 })
    }, {
      scaleX: (0, _reactMotion.spring)(1, { stiffness: 200, damping: 50 }),
      scaleY: (0, _reactMotion.spring)(1, { stiffness: 200, damping: 50 })
    }, {
      scaleX: (0, _reactMotion.spring)(1, { stiffness: 1500, damping: 10 }),
      scaleY: (0, _reactMotion.spring)(1, { stiffness: 1500, damping: 10 })
    }];
    return _this;
  }

  _createClass(MenuButton, [{
    key: 'start',
    value: function start() {
      var _this2 = this;

      setTimeout(function () {
        return _this2.setState({ sequence: 1 });
      }, 100);
      setTimeout(function () {
        return _this2.setState({ sequence: 2 });
      }, 150);
    }
  }, {
    key: 'reverse',
    value: function reverse() {
      var _this3 = this;

      this.setState({ sequence: 1 });
      setTimeout(function () {
        return _this3.setState({ sequence: 0 });
      }, 50);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var _props = this.props,
          x = _props.x,
          y = _props.y,
          onClick = _props.onClick;

      if (!this.props.children) return null;
      return _react2.default.createElement(
        _reactMotion.Motion,
        { style: this.sequenceParams[this.state.sequence] },
        function (_ref) {
          var scaleX = _ref.scaleX,
              scaleY = _ref.scaleY;
          return (0, _react.cloneElement)(_this4.props.children, _extends({}, _this4.props.children.props || {}, {
            onClick: onClick,
            style: _extends({}, _this4.props.children.props && _this4.props.children.props.style || {}, {
              transform: 'translate3d(' + x + 'px, ' + y + 'px, 0) scaleX(' + scaleX + ') scaleY(' + scaleY + ')',
              WebkitTransform: 'translate3d(' + x + 'px, ' + y + 'px, 0) scaleX(' + scaleX + ') scaleY(' + scaleY + ')',
              position: 'absolute'
            })
          }));
        }
      );
    }
  }]);

  return MenuButton;
}(_react.Component);

MenuButton.propTypes = {
  x: _propTypes.number.isRequired,
  y: _propTypes.number.isRequired,
  onClick: _propTypes.func,
  bumpy: _propTypes.bool
};
exports.default = MenuButton;
