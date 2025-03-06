import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import MaskedInput from "react-text-mask";

interface CnpjInputProps {
    control: any;
    name: string;
}

const cnpjMask = [
    /\d/, /\d/, ".", /\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/
];

const CnpjInput: React.FC<CnpjInputProps> = ({ control, name }) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <MaskedInput
                    {...field}
                    mask={cnpjMask}
                    placeholder="00.000.000/0000-00"
                    render={(ref, props) => <TextField {...props} inputRef={ref} fullWidth label="CNPJ" />}
                />
            )}
        />
    );
};

export default CnpjInput;
