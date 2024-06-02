import React, { useMemo } from 'react';
import { useTable, useFilters, usePagination } from 'react-table';
import {
    Table as MuiTable,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TableFooter,
    TablePagination,
    TextField,
    Button,
    CircularProgress,
} from '@mui/material';

import moment from 'moment';


// Define a default UI for filtering
const DefaultColumnFilter = ({
    column: { filterValue, setFilter },
}) => {
    
    return (
        <TextField
            value={filterValue || ''}
            onChange={e => {
                setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
            }}
            placeholder={`Search records...`}
            variant="outlined"
            size="small"
        // style={{margin:"1px"}}
        />
    );
};

const TableDate = ({ data }) => {

    const isLoading = data?.length === 0;

    const columns = useMemo(
        () => [
            {
                Header: 'Proto',
                accessor: 'proto',
                Filter: DefaultColumnFilter,
            },
            {
                Header: 'Event Type',
                accessor: 'event_type',
                Filter: DefaultColumnFilter,
            },
            {
                Header: 'Source IP',
                accessor: 'src_ip',
                Filter: DefaultColumnFilter,
            },
            {
                Header: 'Source Port',
                accessor: 'src_port',
                Filter: DefaultColumnFilter,
            },
            {
                Header: 'Dest IP',
                accessor: 'dest_ip',
                Filter: DefaultColumnFilter,
            },
            {
                Header: 'Dest Port',
                accessor: 'dest_port',
                Filter: DefaultColumnFilter,
            },
            {
                Header: 'Timestamp',
                accessor: 'timestamp',
                Filter: DefaultColumnFilter,
                // Cell: ({ value }) => {
                //     return moment(value).format('DD MMM YYYY HH:mm:ss');
                // }
            },
        ],
        []
    );

    const defaultColumn = useMemo(
        () => ({
            Filter: DefaultColumnFilter,
        }),
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page, // Instead of using rows, we'll use page
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        state: { pageIndex, pageSize },
        prepareRow,
        setPageSize,
    } = useTable(
        {
            columns,
            data,
            defaultColumn,
            initialState: { pageIndex: 0 }, // Pass our initial table state
        },
        useFilters,
        usePagination // Use the usePagination plugin hook
    );

    return (
        <TableContainer component={Paper} style={{ margin: '20px 0' }}>
            <MuiTable {...getTableProps()} size="small">
                <TableHead>
                    {headerGroups.map(headerGroup => (
                        <TableRow {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <TableCell {...column.getHeaderProps()} style={{ textAlign: 'center' }}>
                                    {column.render('Header')}
                                    <div style={{ margin: '0px' }}>{column.canFilter ? column.render('Filter') : null}</div>
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableHead>

                {isLoading ? (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
                        <CircularProgress />
                    </div>
                ) : (
                    <TableBody {...getTableBodyProps()}>
                        {page.map(row => { // Use page instead of rows
                            prepareRow(row);
                            return (
                                <TableRow {...row.getRowProps()}>
                                    {row.cells.map(cell => (
                                        <TableCell {...cell.getCellProps()} style={{ textAlign: 'center' }}>
                                            {cell.render('Cell')}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                )}
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            colSpan={5}
                            count={data.length}
                            rowsPerPage={pageSize}
                            page={pageIndex}
                            onPageChange={(e, newPage) => setPageSize(newPage)}
                            onRowsPerPageChange={e => {
                                setPageSize(Number(e.target.value));
                            }}
                            ActionsComponent={() => (
                                <div style={{ flexShrink: 0, marginLeft: '2.5em' }}>
                                    <Button onClick={() => previousPage()} disabled={!canPreviousPage}>
                                        Previous
                                    </Button>
                                    <Button onClick={() => nextPage()} disabled={!canNextPage}>
                                        Next
                                    </Button>
                                </div>
                            )}
                        />
                    </TableRow>
                </TableFooter>
            </MuiTable>
        </TableContainer>
    );
};

export default TableDate;
