import { Component } from "rainbowui-core";
import { Util } from 'rainbow-foundation-tools';
import PropTypes from 'prop-types';

export default class TextEditor extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <textarea id={this.props.id} rows="10" cols="80">
                {this.getOutputValue()}
            </textarea>
        );
    }

    getOutputValue() {
        let inputValue = null;
        const model = this.props.model;
        const property = this.props.property;
        if (model && property) {
            inputValue = model[property];
        }
        return inputValue;
    }


    componentDidMount() {
        this.initTextEditor();
    }

    componentDidUpdate() {
        super.componentDidUpdate();
        let _self = this;
        const { id } = this.props;
        let inputValue = null;
        const model = this.props.model;
        const property = this.props.property;
        if (model && property) {
            inputValue = model[property];
        }
        if (CKEDITOR.instances[id]) {
            CKEDITOR.instances[id].setData(inputValue);
            CKEDITOR.instances[id].readOnly = Util.parseBool(_self.props.disabled);
        }
    }
    initTextEditor() {
        const _self = this;
        const { id } = this.props;
        if (Util.parseBool(_self.props.isInline)) {
            let editor = CKEDITOR.inline(id,
                {
                    readOnly: Util.parseBool(_self.props.disabled),
                    wordcount: {
                        showCharCount: Util.parseBool(_self.props.showCharCount),
                        showWordCount: Util.parseBool(_self.props.showWordCount),
                        countHTML: Util.parseBool(_self.props.countHTML),
                        maxWordCount: _self.props.maxWordCount,
                        maxCharCount: _self.props.maxCharCount,
                    }

                }
            );
            editor.on('change', function (e) {
                _self.setEditorValue(e);
            })
        } else {
            let editor = CKEDITOR.replace(id,
                {
                    toolbar: Util.parseBool(_self.props.hideToolbar) ? [[""]] : null,
                    readOnly: Util.parseBool(_self.props.disabled),
                    toolbarCanCollapse: Util.parseBool(_self.props.toolbarCollapse),
                    toolbarStartupExpanded: false,
                    wordcount: {
                        showCharCount: Util.parseBool(_self.props.showCharCount),
                        showWordCount: Util.parseBool(_self.props.showWordCount),
                        countHTML: Util.parseBool(_self.props.countHTML),
                        maxWordCount: _self.props.maxWordCount,
                        maxCharCount: _self.props.maxCharCount,
                    }

                }
            );
            editor.on('change', function (e) {
                _self.setEditorValue(e);
            });
        }
    }

    setEditorValue(e){
        const model = this.props.model;
        const property = this.props.property;
        if (model && property) {
            model[property] = e.editor.getData();
        }
    }
};


/**
 * TextEditor component prop types
 */
TextEditor.propTypes = {
    isInline: PropTypes.oneOf([PropTypes.string, PropTypes.bool]),
    model: PropTypes.object,
    property: PropTypes.string,
    hideToolbar: PropTypes.oneOf([PropTypes.string, PropTypes.bool]),
    errorMessage: PropTypes.string,
    disabled: PropTypes.oneOf([PropTypes.string, PropTypes.bool]),
    toolbarCollapse: PropTypes.oneOf([PropTypes.string, PropTypes.bool]),
    showWordCount: PropTypes.oneOf([PropTypes.string, PropTypes.bool]),
    showCharCount: PropTypes.oneOf([PropTypes.string, PropTypes.bool]),
    countHTML: PropTypes.oneOf([PropTypes.string, PropTypes.bool]),
    maxWordCount: PropTypes.number,
    maxCharCount: PropTypes.number,

};

/**
 * Get TextEditor component default props
 */
TextEditor.defaultProps = {
    isInline: false,
    hideToolbar: false,
    disabled: false,
    toolbarCollapse: false,
    showWordCount: false,
    showCharCount: false,
    countHTML: false,
    maxWordCount: -1,
    maxCharCount: -1,
};