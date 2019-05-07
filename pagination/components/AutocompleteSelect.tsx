import React, { Component, ReactElement } from 'react';
import { Form, Select, Icon, AutoComplete as AntdAutoComplete } from 'antd';
import { connect } from 'react-redux';
import styled, { createGlobalStyle } from 'styled-components';

import { fontSizes } from 'variables';
import { AppState } from 'src/common/appState';
import { InputProps } from 'src/common/models/inputModel';
import { selectContractOrganisation } from 'src/features/contract/actions/contractActions';
import { selectBenefitContract } from 'src/features/benefit/actions';

import { AutocompleteField, AutocompleteData, Filters } from '../models/paginationModel';
import {
    autocompleteRequest,
    getInitialValueRequest,
    clearInitialValueData,
} from '../actions/paginationActions';
import {
    getAutocompleteResults,
    getAutocompleteFetchingStatus,
    getInitialValueFetchingStatus,
    getInitialValueData,
} from '../selectors/paginationSelectors';
import { CustomOption } from './CustomOption';

const GlobalSelectOptionStyle = createGlobalStyle`
  && li.ant-select-dropdown-menu-item {
        white-space: normal;
  }
`;

const Center = styled.div`
    text-align: center;
`;

const AutoComplete = styled(AntdAutoComplete)`
    && {
        font-size: ${fontSizes.small};
    }
`;

interface AutocompleteStateProps {
    results: AutocompleteData[];
    isFetchingResults: boolean;
    initialValueData?: AutocompleteData;
    isFetchingInitialValueData: boolean;
}

interface AutocompleteDispatchProps {
    autocompleteRequest: typeof autocompleteRequest;
    getInitialValueRequest: typeof getInitialValueRequest;
    clearInitialValueData: typeof clearInitialValueData;
    selectContractOrganisation: typeof selectContractOrganisation;
    selectBenefitContract: typeof selectBenefitContract;
}

interface AutocompleteProps extends InputProps {
    autocompleteField: AutocompleteField;
    id: string;
    label?: string;
    placeholder?: string;
    message?: string;
    initialValue?: number;
    isFetchingInitialValueData?: boolean;
    required?: boolean;
    notFoundContent?: string;
    onChange?(value: number): void;
    onSelect?(value: number): void;
    onRemove?(): void;
    multiple?: boolean;
    disabled?: boolean;
    searchParams?: Filters;
    defaultValue?: number;
    showLabel?: boolean;
    selectOnly?: boolean;
}

type Props = AutocompleteProps & AutocompleteStateProps & AutocompleteDispatchProps;

export class Autocomplete extends Component<Props> {
    private requestAutocomplete = (searchTerm: string = '') =>
        this.props.autocompleteRequest({
            searchTerm,
            autocompleteField: this.props.autocompleteField,
            searchParams: this.props.searchParams,
        });

    private handleSearch = (searchTerm: string) => this.requestAutocomplete(searchTerm);

    private onFocus = () => this.requestAutocomplete();

    public componentDidMount(): void {
        const { autocompleteField, initialValue: id } = this.props;

        this.props.clearInitialValueData(autocompleteField);

        if (id) {
            this.props.getInitialValueRequest({
                autocompleteField,
                id,
            });
        }
    }

    public onSelect = (value: number) =>
        // ReactElement<any> is type from antd
        this.props.onSelect && this.props.onSelect(value);

    private onSelectSelection = (value: number, e: ReactElement<any>) => {
        // ReactElement<any> is type from antd
        this.onSelect(value);

        const { organisation, contract } = e.props.children.props;

        if (e && organisation) {
            this.props.selectContractOrganisation(organisation);
        }

        if (e && contract) {
            this.props.selectBenefitContract(contract);
        }
    };

    public onRemove = (value: any) => {
        if (!value && this.props.onRemove) {
            this.props.onRemove();
        }
    };

    public render(): JSX.Element {
        const {
            id: fieldId,
            label,
            required,
            message,
            placeholder,
            isFetchingResults,
            multiple,
            autocompleteField,
            initialValueData,
            isFetchingInitialValueData,
            results,
            disabled,
            notFoundContent = 'Not found',
            defaultValue,
            showLabel = true,
            selectOnly = true,
        } = this.props;

        const autocompleteData = initialValueData
            ? [initialValueData, ...results.filter(({ id }) => id !== initialValueData.id)]
            : results;

        const formattedData = autocompleteData.map(
            ({ id, name, title, outcome, user, referenceNumber, organisation, contract }) => {
                const employee = autocompleteField === AutocompleteField.Employee;

                const value =
                    employee && user
                        ? `${user.firstName} ${user.lastName}`
                        : `${name || title || outcome || ''}`;

                const key = employee && user ? user.id : id;

                return {
                    key: key.toString(),
                    value,
                    organisation,
                    contract,
                    referenceNumber: referenceNumber && `(${referenceNumber})`,
                };
            },
        );

        const notFound = (
            <Center>{isFetchingResults ? <Icon type="loading" /> : notFoundContent}</Center>
        );

        const initialValue =
            initialValueData && !isFetchingInitialValueData && initialValueData.id.toString();

        const autoCompleteData = formattedData.map(({ value }) => value);

        const decoratorOptions = {
            rules: [{ required, message }],
            initialValue: defaultValue || initialValue,
        };

        return (
            <>
                <Form.Item label={showLabel && (label || placeholder)} required={required}>
                    <GlobalSelectOptionStyle />
                    {selectOnly ? (
                        <>
                            {this.props.form.getFieldDecorator(fieldId, decoratorOptions)(
                                <Select
                                    showSearch
                                    onSearch={this.handleSearch}
                                    placeholder={placeholder || label}
                                    loading={isFetchingInitialValueData}
                                    allowClear
                                    size="large"
                                    notFoundContent={notFound}
                                    filterOption={false}
                                    onFocus={this.onFocus}
                                    mode={multiple ? 'multiple' : 'default'}
                                    onSelect={this.onSelectSelection}
                                    onChange={this.onRemove}
                                    disabled={disabled}
                                >
                                    {formattedData.map(
                                        ({
                                            key,
                                            value,
                                            referenceNumber,
                                            organisation,
                                            contract,
                                        }) => (
                                            <Select.Option key={key} value={key}>
                                                <CustomOption
                                                    organisation={organisation}
                                                    contract={contract}
                                                >
                                                    {value} {referenceNumber}
                                                </CustomOption>
                                            </Select.Option>
                                        ),
                                    )}
                                </Select>,
                            )}
                        </>
                    ) : (
                        <>
                            {this.props.form.getFieldDecorator(fieldId, decoratorOptions)(
                                <AutoComplete
                                    showSearch
                                    onSearch={this.handleSearch}
                                    placeholder={placeholder || label}
                                    loading={isFetchingInitialValueData}
                                    allowClear
                                    size="large"
                                    onFocus={this.onFocus}
                                    dataSource={autoCompleteData}
                                    onSelect={this.onSelect}
                                    disabled={disabled}
                                />,
                            )}
                        </>
                    )}
                </Form.Item>
            </>
        );
    }
}

const mapStateToProps = (
    state: AppState,
    { autocompleteField }: AutocompleteProps,
): AutocompleteStateProps => ({
    results: getAutocompleteResults(state, autocompleteField),
    isFetchingResults: getAutocompleteFetchingStatus(state, autocompleteField),
    initialValueData: getInitialValueData(state, autocompleteField),
    isFetchingInitialValueData: getInitialValueFetchingStatus(state, autocompleteField),
});

export const AutocompleteSelect = connect(
    mapStateToProps,
    {
        autocompleteRequest,
        getInitialValueRequest,
        clearInitialValueData,
        selectContractOrganisation,
        selectBenefitContract,
    },
)(Autocomplete);
