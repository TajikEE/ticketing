import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Home from "@/views/Home.vue";

const tickets = [
  {
    _id: "6055316c70b71f929e257896",
    email: "asd@gmail.com",
    title: "Why do we use it?",
    description:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    dueDate: "2021-03-30T21:00:00.000Z",
    priority: 4,
    status: "OPEN",
  },
  {
    _id: "60586cbaf328ccf85cf0634b",
    email: "asd@gmail.com",
    title: "Big task",
    description: "Do task ",
    dueDate: "2021-03-30T21:00:00.000Z",
    priority: 1,
    status: "IN_PROGRESS",
  },
];

const localVue = createLocalVue();

localVue.use(Vuex);

describe("Home.vue", () => {
  let actions;
  let state;
  let store;

  beforeEach(() => {
    state = {
      tickets,
    };
    actions = {
      getTicketList: jest.fn(),
    };
    store = new Vuex.Store({
      state,
      actions,
    });
  });

  it('calls store action "getTicketList" when page loads', () => {
    shallowMount(Home, { store, localVue });

    expect(actions.getTicketList).toHaveBeenCalledTimes(1);
  });

  it("renders table", () => {
    const wrapper = shallowMount(Home, { store, localVue });
    const bar = wrapper.findComponent({ ref: "table" }); // => finds Bar by component instance
    expect(bar.exists()).toBe(true);
  });

  it("changes the modal state when button is clicked", async () => {
    const wrapper = shallowMount(Home, { store, localVue });
    const createTicketBtn = wrapper.find({ ref: "createTicketBtn" });

    wrapper.setData({ showModal: false });

    createTicketBtn.trigger("click");

    expect(wrapper.vm.showModal).toBe(true);
  });
});
