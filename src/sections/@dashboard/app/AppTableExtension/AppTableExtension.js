import { filter } from 'lodash';
import { useState } from 'react';
import moment from 'moment';

// material
import {
    Card,
    Table,
    Stack,
    Avatar,
    Checkbox,
    TableRow,
    TableBody,
    TableCell,
    Typography,
    TableContainer,
    TablePagination,
} from '@mui/material';
// components
import SearchNotFound from '../../../../components/SearchNotFound';
import Label from '../../../../components/Label';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../../user';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
    { id: 'name.en', label: 'Name', alignRight: false },
    { id: 'catogory', label: 'Type', alignRight: false },
    { id: 'public', label: 'Visibility', alignRight: false },
    { id: 'createdAt', label: 'Creation Date', alignRight: false },
    { id: 'version.status', label: 'Last version status', alignRight: false },
    { id: '' },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    if (query) {
        return filter(array, (_user) => _user.name.en.toLowerCase().indexOf(query.toLowerCase()) !== -1);
    }
    return stabilizedThis.map((el) => el[0]);
}

export const AppTableExtension = ({ list }) => {
    const [page, setPage] = useState(0);
    const [order, setOrder] = useState('asc');
    const [selected, setSelected] = useState([]);
    const [orderBy, setOrderBy] = useState('name');
    const [filterName, setFilterName] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = list.map((n) => n.name);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
        }
        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleFilterByName = (event) => {
        setFilterName(event.target.value);
    };

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - list.length) : 0;

    const filteredItems = applySortFilter(list, getComparator(order, orderBy), filterName);

    const isItemNotFound = filteredItems.length === 0;

    const getStatusColor = (version) => {
        if (!version) {
            return 'default'
        }

        switch (version.status) {
            case 'deployed':
            case 'validated':
                return 'success';
            case 'draft':
            case 'suspended':
                return 'default';
            case 'pending_validation':
            case 'in_review':
                return 'warning';
            case 'rejected':
                return 'error';
            default:
                return 'default';
        }
    }

    const getVersionStatusLabel = (version) => {
        if (!version) {
            return 'Empty'
        }
        switch (version.status) {
            case 'deployed':
                return 'Deployed'
            case 'validated':
                return 'Validated'
            case 'draft':
                return 'Draft';
            case 'suspended':
                return 'Suspended';
            case 'pending_validation':
                return 'Pending validation'
            case 'in_review':
                return 'In review'
            case 'rejected':
                return 'Rejected'
            default:
                return 'Empty';
        }
    }

    return (
        <Card>
            <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />


            <TableContainer sx={{ minWidth: 800 }}>
                <Table>
                    <UserListHead
                        order={order}
                        orderBy={orderBy}
                        headLabel={TABLE_HEAD}
                        rowCount={list.length}
                        numSelected={selected.length}
                        onRequestSort={handleRequestSort}
                        onSelectAllClick={handleSelectAllClick}
                    />
                    <TableBody>
                        {filteredItems.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                            const { id, name, category, icon, createdAt, version, public: isPublic } = row;
                            const isItemSelected = selected.indexOf(name) !== -1;

                            return (
                                <TableRow
                                    hover
                                    key={id}
                                    tabIndex={-1}
                                    role="checkbox"
                                    selected={isItemSelected}
                                    aria-checked={isItemSelected}
                                >
                                    <TableCell padding="checkbox">
                                        <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, name)} />
                                    </TableCell>
                                    <TableCell component="th" scope="row" padding="none">
                                        <Stack direction="row" alignItems="center" spacing={2}>
                                            <Avatar sx={{ bgcolor: 'white' }} alt={name} src={icon.en} />
                                            <Typography variant="subtitle2" noWrap>
                                                {name.en}
                                            </Typography>
                                        </Stack>
                                    </TableCell>
                                    <TableCell align="left">{category}</TableCell>
                                    <TableCell align="center">
                                        <Label variant="ghost" color={(isPublic && 'success') || 'error'}>
                                            {isPublic ? 'Public' : 'Private'}
                                        </Label>
                                    </TableCell>
                                    <TableCell align="center">{moment(createdAt).format('DD/MM/YYYY')}</TableCell>
                                    <TableCell align="center">
                                        <Label variant="ghost" color={getStatusColor(version)}>
                                            {getVersionStatusLabel(version)}
                                        </Label>
                                    </TableCell>
                                    <TableCell align="right">
                                        <UserMoreMenu detailsLink={`/dashboard/extension/${id}`}/>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                        {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>

                    {isItemNotFound && (
                        <TableBody>
                            <TableRow>
                                <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                                    <SearchNotFound searchQuery={filterName} />
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    )}
                </Table>
            </TableContainer>


            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={list.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Card>
    );
}
