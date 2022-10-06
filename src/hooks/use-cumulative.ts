import { useTypedSelector } from "./use-typed-selector";

export const useCumulativeCode = (cellId: string) => {
  return useTypedSelector((state) => {
    const { data, order } = state.cells!;
    const orderedCells = order.map((id) => data[id]);

    const showFunc = `
    import _React from 'react';
    import _ReactDOM from 'react-dom';

    var show = (value) => {
      const root = document.querySelector('#root');

      if(typeof value === 'object'){
        if(value.$$typeof && value.props){
          _ReactDOM.render(value,root);
        }else{
          root.innerHTML = JSON.stringify(value);
        }
      }else{
        root.innerHTML = value;
      }
    };
  `;

    const showFuncWithNoop = `
        var show = (value) => {
          
        };
    `;

    const cumulativeCode = [];

    for (let cell of orderedCells) {
      if (cell.type === "code") {
        if (cell.id !== cellId) {
          cumulativeCode.push(showFuncWithNoop);
          cumulativeCode.push(cell.content);
        } else {
          cumulativeCode.push(showFunc);
          cumulativeCode.push(cell.content);
          break;
        }
      }
    }

    return cumulativeCode;
  }).join("\n");
};
