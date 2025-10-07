import { Collapse, Typography } from "@mui/material";
import type React from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import type { Option } from "@/types/models";

type DropDownBoxProps = {
    title: string;
    isOpen: boolean;
    optionName: Option;
    openCloseCallback: React.Dispatch<React.SetStateAction<Option>>;
    children?: React.ReactNode;
}

const DropDownBox: React.FC<DropDownBoxProps> = (
    { title,
        isOpen,
        optionName,
        openCloseCallback,
        children
    }: DropDownBoxProps
) => {
    return (
        <div>
            <div
                onClick={() =>
                    openCloseCallback(
                        isOpen
                            ? null
                            : optionName,
                    )
                }
                style={{
                    borderRadius: '8px',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '8px',
                    backgroundColor: '#1e668aff',
                    opacity: '0.5',
                    marginBottom: '8px',
                }}
            >
                <Typography>{title}</Typography>
                {isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </div>
            <Collapse
                id="player-faction-collapse"
                in={isOpen}
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        flexShrink: 1,
                        marginTop: 8,
                    }}
                >
                    {children}
                </div>
            </Collapse>
        </div>);
}

export default DropDownBox;