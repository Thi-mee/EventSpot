const getButtonClasses = (props, style) => {
  const { className, size, disabled, variant } = props;
  const classes = [className, style.btn];
  if (size) {
    classes.push(style[`btn-${size}`]);
  }
  if (disabled) {
    classes.push(style.disabled);
  }
  if (variant) {
    classes.push(style[`btn-${variant}`]);
  }
  return classes.join(' ');
}

const getCtnClasses = (props, style) => {
  const {position} = props;
  const classes = [style.ctn];
  if (position && position === 'right') {
    classes.push(style['ctn-pos-right']);
  }
  if (position && position === 'left') {
    classes.push(style['ctn-pos-left']);
  }
  return classes.join(' ');
}




export {
  getButtonClasses,
  getCtnClasses,
}