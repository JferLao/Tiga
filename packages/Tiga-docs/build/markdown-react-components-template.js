module.exports = template = ({ imports, js, jsx, state, method, options }) => {
  const moduleText = `
  ${imports}

  ${js}

  class MarkdownItReactComponent extends React.Component {
      constructor(props){
          super(props);
          this.state = ${state || '{}'};
          Object.assign(this,props.methods)
      }
      handleToggleCode(flag){
          const state = {};
          state['showCode' + flag] = !this.state['showCode' + flag];
          this.setState(state);
      }
      handleCopyCode (code) {
        copy(code)
      }
      ${method || ''}
      render(){
          return (
              <div className="${options.className}">
                  ${jsx}
              </div>
          );
      }
  };

  export default MarkdownItReactComponent;`

  return moduleText
}
