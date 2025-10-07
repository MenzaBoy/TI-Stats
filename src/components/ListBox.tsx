import { Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';

type ListBoxProps = {
    title: string;
    listContent: any[];
    emptyContentText: string;
    itemKey?: string;
    itemCallback?: React.Dispatch<React.SetStateAction<any>>;
    children?: React.ReactNode;
};

/**
 * ListBox component
 *
 * Renders a titled list of items. Each item is displayed as a bullet point.
 * Optionally, a callback can be provided to customize the rendering of each item.
 *
 * Props:
 * - titleElement: React.ReactNode - The title or header element for the list.
 * - listContent: any[] - Array of items to display in the list.
 * - contentCallback?: (item: string) => React.ReactNode - Optional callback to render custom content for each item.
 *
 * Example usage:
 * <ListBox
 *     title={"Games"}
 *     listContent={loadedGames}
 *     itemCallback={setOpenGame}
 * >
 *         {openGame && <GameDetail game={openGame} />}
 * </ListBox>
 */
const ListBox: React.FC<ListBoxProps> = ({
    title,
    listContent,
    emptyContentText,
    itemKey,
    itemCallback,
    children,
}: ListBoxProps) => {
    return (
        <>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                {children && (
                    <div
                        onClick={() =>
                            itemCallback ? itemCallback(null) : null
                        }
                        style={{ cursor: 'pointer' }}
                    >
                        <ArrowBackIcon />
                    </div>
                )}
                <div style={{ flexGrow: 1 }}>
                    <Typography variant="h6" gutterBottom>
                        {title}
                    </Typography>
                </div>
                {children && <VideogameAssetIcon />}
            </div>
            {listContent.length === 0 && (
                <Typography variant="body1" gutterBottom>
                    {emptyContentText}
                </Typography>
            )}
            {!children &&
                listContent.map((item, index) => (
                    <div
                        key={index}
                        onClick={() =>
                            itemCallback ? itemCallback(item) : null
                        }
                        style={{
                            cursor: itemCallback ? 'pointer' : 'default',
                            marginBottom: '2px',
                        }}
                    >
                        <Typography key={index} variant="body1">
                            • {itemKey ? item[itemKey] : item}
                        </Typography>
                    </div>
                ))}
            {children}
        </>
    );
};

export default ListBox;
