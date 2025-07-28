import React from "react";
import styles from "./index.module.less";
import classNames from "classnames";

interface MenuItem {
  label: string;
  value: any;
}

interface Props {
  value?: MenuItem["value"];
  options?: MenuItem[];
  onChange?: (value: MenuItem["value"]) => void;
}

export default (props: Props) => {
  return (
    <div className={styles.menu}>
      {props?.options?.map((option) => {
        const isSelected = props.value === option.value;
        return (
          <div
            key={option.value}
            className={classNames(
              styles.menu_item,
              isSelected && styles.menu_item_selected,
            )}
            onClick={() => {
              props?.onChange?.(option.value);
            }}
          >
            {option.label}
          </div>
        );
      })}
    </div>
  );
};
