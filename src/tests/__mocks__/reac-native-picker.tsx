import React from "react";
import { Picker as RNPicker } from "@react-native-picker/picker";

type Props = {
  onValueChange: (itemValue: any, itemIndex: number) => void;
  selectedValue: any;
  children: React.ReactNode;
  testID?: string;
};

const Picker = ({ onValueChange, selectedValue, children, testID }: Props) => {
  return (
    <RNPicker
      selectedValue={selectedValue}
      onValueChange={onValueChange}
      testID={testID}
    >
      {children}
    </RNPicker>
  );
};

export { Picker };
