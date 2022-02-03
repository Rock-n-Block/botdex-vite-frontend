import { types } from 'mobx-state-tree';

const Sidebar = types
  .model({
    isOpen: types.boolean,
  })
  .actions((self) => {
    const toggleSidebar = () => {
      self.isOpen = !self.isOpen;
    };
    return {
      toggleSidebar,
    };
  });
export default Sidebar;
