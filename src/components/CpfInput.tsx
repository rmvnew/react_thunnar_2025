import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import MaskedInput from "react-text-mask";

interface CpfInputProps {
    control: any;
    name: string;
}

const cpfMask = [
    /\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, "-", /\d/, /\d/
];

const CpfInput: React.FC<CpfInputProps> = ({ control, name }) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <MaskedInput
                    {...field}
                    mask={cpfMask}
                    placeholder="000.000.000-00"
                    render={(ref, props) => <TextField {...props} inputRef={ref} fullWidth label="CPF" />}
                />
            )}
        />
    );
};

export default CpfInput;
