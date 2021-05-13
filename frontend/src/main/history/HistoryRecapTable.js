import React from 'react'
import PropTypes from 'prop-types'
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    makeStyles,
    Chip,
} from '@material-ui/core';

const useStyles = makeStyles({
    tableContainer: {
      //minWidth: 650,
      maxHeight: 440,
    },
    root: {
      //minWidth: 650,
      //maxHeight: 50,
    },
    tabCellHead: {
      width: 200,
    },
    statusChipSucces: {
      backgroundColor: '#4CAF50',
      color: '#FFFFFF',
    },
    statusChipFailed: {
      backgroundColor: '#F44336',
      color: '#FFFFFF',
    },
  });

function HistoryRecapTable({ rows }) {
    const classes = useStyles()

    return (
        <>
            <Paper className={classes.root}>
                <TableContainer component={Paper} className={classes.tableContainer}>
                  <Table className={classes.table} stickyHeader aria-label="sticky table">
                    <TableHead>
                      <TableRow>
                        <TableCell className={classes.tabCellHead} >Client</TableCell>
                        <TableCell className={classes.tabCellHead} align="center">Email</TableCell>
                        <TableCell className={classes.tabCellHead} align="right">Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((row, index) => (
                        <TableRow key={`table-client-${index}-key`}>
                          <TableCell component="th" scope="row">
                            {`${row.firstName} ${row.lastName}`}
                          </TableCell>
                          <TableCell align="center">{row.email}</TableCell>
                          <TableCell align="right">
                            {
                              row.status ?
                              <Chip className={classes.statusChipSucces} size="small" label="Success" />
                              :
                              <Chip className={classes.statusChipFailed} size="small" label="Failed" />
                            }
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
            </Paper>
        </>
    )
}

HistoryRecapTable.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default HistoryRecapTable
