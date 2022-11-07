export const RULES = {
  ["ADMIN"]: {
    ["EDIT_POST"]: true,
    ["DELETE_POST"]: true,
    ["VIEW_POST"]: true,
  },
  ["USER"]: {
    ["EDIT_POST"]: (post, user) => post?.owner?.id === user?.id,
    // ["DELETE_POST"]: (post, user) => post?.owner?.id === user?.id,
    ["VIEW_POST"]: true,
  },
  ["VISITANT"]: {
    ["VIEW_POST"]: true,
  },
};
