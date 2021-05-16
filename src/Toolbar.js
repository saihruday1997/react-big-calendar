import PropTypes from 'prop-types'
import React from 'react'
import clsx from 'clsx'
import { navigate } from './utils/constants'
import ChevronLeftRoundedIcon from '@material-ui/icons/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@material-ui/icons/ChevronRightRounded';
import { Box, Typography } from '@material-ui/core';

class Toolbar extends React.Component {
  render() {
    let {
      localizer: { messages },
      label,
    } = this.props

    return (
      <div className="rbc-toolbar">
        <span className="rbc-btn-group">
          {this.viewNamesGroup(messages)}
        </span>

        <span className="rbc-toolbar-label">{label}</span>

        <span className="rbc-btn-group" >
          <Box display="flex" flexDirection="row" alignItems="center" bgcolor="#EBF3F3">
            <Box display="flex" width="32px" height="29px" justifyContent="center" alignItems="center" 
              border=" 0.5px solid #C5C5C5" borderRadius="4px" bgcolor="#FFFFFF" 
              onClick={this.navigate.bind(null, navigate.PREVIOUS)}
              className="navigation"
            >
              <ChevronLeftRoundedIcon size="small" />
            </Box>
            <Box px={1}>
              <Box display="flex" height="29px" justifyContent="center" alignItems="center" 
                border=" 0.5px solid #C5C5C5" borderRadius="4px" bgcolor="#FFFFFF" px={2}
                onClick={this.navigate.bind(null, navigate.TODAY)}
                className="navigation"
              >
                <Typography className="noselect" >{messages.today}</Typography>
              </Box>
            </Box>
            <Box
              display="flex" width="32px" height="29px" justifyContent="center" alignItems="center" 
              border=" 0.5px solid #C5C5C5" borderRadius="4px" bgcolor="#FFFFFF"
              onClick={this.navigate.bind(null, navigate.NEXT)}
              className="navigation"
            >
              <ChevronRightRoundedIcon />
            </Box>
          </Box>
        </span>
      </div>
    )
  }

  navigate = action => {
    this.props.onNavigate(action)
  }

  view = view => {
    this.props.onView(view)
  }

  viewNamesGroup(messages) {
    let viewNames = this.props.views
    const view = this.props.view

    if (viewNames.length > 1) {
      return viewNames.map(name => (
        <button
          type="button"
          key={name}
          className={clsx({ 'rbc-active': view === name })}
          onClick={this.view.bind(null, name)}
        >
          {messages[name]}
        </button>
      ))
    }
  }
}

Toolbar.propTypes = {
  view: PropTypes.string.isRequired,
  views: PropTypes.arrayOf(PropTypes.string).isRequired,
  label: PropTypes.node.isRequired,
  localizer: PropTypes.object,
  onNavigate: PropTypes.func.isRequired,
  onView: PropTypes.func.isRequired,
}

export default Toolbar
