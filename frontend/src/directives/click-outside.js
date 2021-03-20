const { documentElement } = document;
const eventSymbol = Symbol();

export const clickOutside = {
  bind(el, binding, vnode) {
    el[eventSymbol] = (event) => {
      if (!(el === event.target || el.contains(event.target) === true)) {
        vnode.context[binding.expression](event);
      }

      return false;
    };

    documentElement.addEventListener("click", el[eventSymbol], true);
  },

  unbind(el) {
    documentElement.removeEventListener("click", el[eventSymbol], true);
  },
};
