import _ from "lodash";
// const trimNickname = (labels) => {
//   const copyLabels = _.cloneDeep(labels);
//   console.log(copyLabels);
//   copyLabels.forEach((item) => {
//     delete item.labeledBy;
//   });
//   return copyLabels;
// };

function getOriginalName(id, oldLabels) {
  let result = "FgSurewin";
  oldLabels.forEach((item) => {
    if (item.label_id === id) {
      result = item.labeledBy;
    }
  });
  return result;
}

function compareBox(oldBox, newBox) {
  let result = true;
  const keyNames = Object.keys(oldBox);
  keyNames.forEach((key) => {
    if (oldBox[key] !== newBox[key]) {
      result = false;
    }
  });
  return result;
}

export const compareLabels = (oldLabels, newLabels, creator, currentUser) => {
  const samePerson = creator === currentUser;
  let same = true;
  if (oldLabels.length !== newLabels.length) same = false;
  newLabels.forEach((newLabel) => {
    oldLabels.forEach((oldLabel) => {
      if (newLabel.label_id === oldLabel.label_id) {
        if (compareBox(oldLabel.box, newLabel.box)) {
          newLabel.labeledBy = getOriginalName(oldLabel.label_id, oldLabels);
        } else {
          same = false;
        }
      } else {
      }
    });
  });
  return {
    samePerson,
    same,
    final_labels: newLabels,
  };
};

export function updatePanoMarkersNames(markers, newLabels) {
  const result = _.cloneDeep(markers);
  result.forEach((item) => {
    newLabels.forEach((newLabel) => {
      if (item.label_id === newLabel.label_id) {
        item.nickname = newLabel.labeledBy;
      }
    });
  });
  return result;
}
