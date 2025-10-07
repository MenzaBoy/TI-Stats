import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Autocomplete,
    TextField,
    DialogContentText,
} from '@mui/material';
import {
    deleteCalendarEntry,
    loadCalendarEntries,
    loadPlayers,
    saveCalendarEntry,
} from '@/lib/storage';
import type { CalendarEntry, Player } from '@/types/models';
import type { DatesSetArg, EventContentArg } from '@fullcalendar/core/index.js';
import { stringToColor } from '@/utils';

type CalendarTabProps = {
    campaignId: string;
};

const CalendarTab: React.FC<CalendarTabProps> = ({
    campaignId,
}: CalendarTabProps) => {
    const [entries, setEntries] = useState<CalendarEntry[]>([]);
    const [open, setOpen] = useState(false);
    const [players, setPlayers] = useState<Player[]>([]);
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null);

    useEffect(() => {
        loadPlayers(campaignId).then(loadedPlayers =>
            setPlayers(loadedPlayers),
        );
        loadCalendarEntries(
            campaignId,
            new Date().getFullYear().toString(),
            (new Date().getMonth() + 1).toString().padStart(2, '0'),
        ).then(loadedEntries => {
            setEntries(loadedEntries);
        });
    }, [campaignId]);

    const refreshEntries = (arg: DatesSetArg) => {
        const midDate = arg.start;
        midDate.setDate(midDate.getDate() + 7); // If the first day of the month is Sunday,
        // we need to go 7 days forward to get to the actual month
        loadCalendarEntries(
            campaignId,
            new Date().getFullYear().toString(),
            (midDate.getMonth() + 1).toString().padStart(2, '0'),
        ).then(loadedEntries => {
            setEntries(loadedEntries);
        });
    };

    const handleDateClick = (info: any) => {
        setSelectedDate(info.dateStr);

        if (
            new Date(info.dateStr) <
            new Date(new Date().toISOString().slice(0, 10))
        ) {
            alert('You cannot alter events for past dates.');
            return;
        }
        setOpen(true);
    };

    const handleAdd = async () => {
        if (!selectedDate || !selectedPlayer) {
            console.log('Add error occured!'); // Could use better error handling here, but this should never
            // occur due to button disabling
            return;
        }

        const newEntry: CalendarEntry = {
            title: selectedPlayer,
            date: selectedDate,
            color: stringToColor(selectedPlayer),
        };
        setEntries([...entries, newEntry]);

        await saveCalendarEntry(
            campaignId,
            selectedDate?.split('-')[0],
            selectedDate?.split('-')[1],
            newEntry,
        );
        setOpen(false);
        setSelectedPlayer(null);
    };

    const handleEventClick = (info: any) => {
        if (
            new Date(info.el.fcSeg.eventRange.range.start) <
            new Date(new Date().toISOString().slice(0, 10))
        ) {
            alert('You cannot alter events for past dates.');
            return;
        }
        if (
            window.confirm(
                `Remove ${info.event.title}'s availability on ${info.event.startStr}?`,
            )
        ) {
            setEntries(
                entries.filter(
                    e =>
                        !(
                            e.title === info.event.title &&
                            e.date === info.event.startStr
                        ),
                ),
            );
            deleteCalendarEntry(
                campaignId,
                info.event.startStr.split('-')[0],
                info.event.startStr.split('-')[1],
                {
                    title: info.event.title,
                    date: info.event.startStr,
                    color: stringToColor(info.event.title),
                },
            );
        }
    };

    const getAvailablePlayersForDate = () => {
        const selectedDateEntries = entries.filter(
            entry => entry.date === selectedDate,
        );
        const alreadySelectedPlayers = selectedDateEntries.map(
            entry => entry.title,
        );
        return players
            .map(player => player.name)
            .filter(player => !alreadySelectedPlayers.includes(player));
    };

    const renderEventContent = (eventInfo: EventContentArg) => {
        return (
            <div style={{ display: 'flex' }}>
                <i style={{ overflow: 'hidden' }}>{eventInfo.event.title}</i>
            </div>
        );
    };

    const addPastClass = (arg: { date: Date }) => {
        if (arg.date < new Date(new Date().setHours(0, 0, 0, 0))) {
            return ['fc-day-past']; // custom class for past days
        }
        return [];
    };

    return (
        <div style={{ margin: '0 auto', padding: '0px 20px 0px 20px' }}>
            <h2 className="text-xl font-bold mb-4">Boardgame Availability</h2>

            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                firstDay={1}
                events={entries}
                dateClick={handleDateClick}
                eventClick={handleEventClick}
                eventContent={renderEventContent}
                datesSet={refreshEntries}
                dayCellClassNames={addPastClass}
                height="auto"
                fixedWeekCount={false}
            />
            <style>
                {`
                .fc-day-past {
                    background-color: rgba(200, 200, 200, 0.3);
                }
                .fc-day-past a{
                    color: #a19797ff;
                }
                `}
            </style>

            {/* Player selection dialog */}
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Select a Player</DialogTitle>
                <DialogContentText>{selectedDate}</DialogContentText>
                <DialogContent>
                    <Autocomplete
                        options={getAvailablePlayersForDate()}
                        value={selectedPlayer}
                        onChange={(_, newValue) => setSelectedPlayer(newValue)}
                        renderInput={params => (
                            <TextField
                                {...params}
                                label="Player"
                                variant="outlined"
                            />
                        )}
                        sx={{ minWidth: 250, mt: 1 }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button
                        onClick={handleAdd}
                        variant="contained"
                        disabled={!selectedPlayer}
                    >
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default CalendarTab;
