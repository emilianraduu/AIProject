import React from 'react'
import {BoxContent, BoxHeader, BoxWrapper, HeaderWithIcon} from '../../Global/Box/styles/box'
import {BigPGreyBold, Label} from '../../../styles/typography/typography'
import {DualBoxWrapper, FormItem, StaffFormFooter, StaffFormWrapper} from '../../../styles/shared/form'
import {Field, Form} from 'react-final-form'
import {FieldInput} from '../../Global/Input/FieldInput'
import {FieldSelect} from '../../Global/Select/FieldSelect'
import {SecondaryButton} from '../../../styles/shared/button'
import {FILE_ICON} from '../../../styles/abstract/variables'

export default function RoomsCreateForm({onSubmit, teachers}) {
    return (
        <Form
            onSubmit={onSubmit}
            validate={({name, user}) => {
            }}
            render={({handleSubmit, pristine, invalid}) => (
                <form onSubmit={handleSubmit}>
                    <StaffFormWrapper>
                        <DualBoxWrapper web>
                            <BoxWrapper web large>
                                <BoxHeader>
                                    <HeaderWithIcon flex>
                                        <i className={FILE_ICON}/>
                                        <BigPGreyBold>Create room</BigPGreyBold>
                                    </HeaderWithIcon>
                                </BoxHeader>
                                <BoxContent>
                                    <FormItem>
                                        <Label>Room name</Label>
                                        <Field component={FieldInput} name='number' placeholder={'Type room name'}/>
                                    </FormItem>
                                    <FormItem>
                                        <Label>Capacity</Label>
                                        <Field component={FieldInput} name='capacity' placeholder={'Type room capacity'}/>
                                    </FormItem>
                                    <FormItem>
                                        <Label>Features</Label>
                                        <Field component={FieldInput} name='features' placeholder={'Type room features'}/>
                                    </FormItem>
                                </BoxContent>
                            </BoxWrapper>
                        </DualBoxWrapper>
                        <StaffFormFooter>
                            <FormItem style={{width: 'fit-content'}}>
                                <SecondaryButton filled type={'submit'}
                                                 disabled={pristine || invalid}>Create</SecondaryButton>
                            </FormItem>
                        </StaffFormFooter>
                    </StaffFormWrapper>
                </form>

            )}
        />
    )
}
