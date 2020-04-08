import React, {Component} from "react";
import {withStyles} from "@material-ui/core/styles";
import IconButtonWithTooltip from "./IconButtonWithTooltip";
import {faCode} from "@fortawesome/free-solid-svg-icons";
import Toolbar from "@material-ui/core/Toolbar";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const styles = (theme) => ({
    toolbar: {
        padding: theme.spacing(0),
        marginLeft: theme.spacing(1)
    },
    button: {
        padding: theme.spacing(1),
        top: theme.spacing(0),
        color: theme.palette.button.main
    },
});


class Code extends Component {
    constructor(props) {
        super(props);
        const sourceTooltip = "Show the full source code";
        this.state = {
            source: false,
            sourceTooltip: sourceTooltip,
        };
        this.handleSourceClick = this.handleSourceClick.bind(this)
    }

    getInstantiation(file, element) {
        let re = new RegExp(`<${element}(.|\\n)+?\\/>`);
        let matches = file.match(re);
        return matches? matches: "Instantiation not found.";
    }


    handleSourceClick() {
        const sourceTooltip = this.state.source ? "Show the full source code" : "Hide the full source code";
        this.setState({source: !this.state.source, sourceTooltip: sourceTooltip})
    }

    render() {
        const {classes, file, element} = this.props;
        const {source, sourceTooltip} = this.state;

        const content = source ? file : this.getInstantiation(file, element);
        const sourceButton = (<IconButtonWithTooltip
            disabled={false}
            onClick={this.handleSourceClick}
            className={classes.button}
            icon={faCode}
            tooltip={sourceTooltip}
        />);

        return (
            <div>
                <Toolbar className={classes.toolbar}>
                    {sourceButton}
                </Toolbar>
                <SyntaxHighlighter language="javascript" style={darcula}>
                    {content}
                </SyntaxHighlighter>
            </div>
        )
    }
}

export default withStyles(styles, {withTheme: true})(Code);