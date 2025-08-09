'use client'
import { useEffect, useState } from "react";
import { PhoneInput } from "./phone-input";

export default function PhoneInputModed({
    defaultValue,
    onChange,
}: {
    defaultValue: string;
    onChange: (value: string) => void;
}) {
    const [value, setValue] = useState(defaultValue);
    useEffect(() => {
        onChange(value.replace(" ", ""));
    }, [value]);
    return <PhoneInput value={value} onChange={setValue} defaultValue={value} defaultCountry="NG" international />;
}