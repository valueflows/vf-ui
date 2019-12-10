export const storiesOf = function storiesOf() {
  var api = {};
  api.add = (name, func)=> {
    func();
    return api;
  };
  api.addWithInfo = (name, func)=> {
    func();
    return api;
  };
  return api;
};
export const action = () => {};

export const linkTo = () => {};

export const specs = (spec) => {
  spec();
};

export const describe = jasmine.currentEnv_.describe;
export const it = jasmine.currentEnv_.it;
