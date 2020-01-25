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
    const typeOptions= [{value: 'Course', label: 'Course'},{value: 'Laboratory', label: 'Laboratory'}]
    const featuresOptions=[{value: 'Computers', label: 'Computers'},{value: 'Projector', label: 'Projector'}]
    return (
        <Form
            onSubmit={onSubmit}
            validate={({number,capacity,type,features, user}) => {
                const errors={}
                if(!number){
                    errors.number = 'Insert name'
                }
                if(!capacity){
                    errors.capacity = 'Insert capacity'
                }
                if(!type){
                    errors.type = 'Select type'
                }
                if(!features){
                    errors.features = 'Select feature'
                }
                return errors
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
                                        <Label>Type</Label>
                                        <Field component={FieldSelect} options={typeOptions} name='type'
                                               placeholder={'Type'}/>
                                    </FormItem>
                                    <FormItem>
                                        <Label>Feature</Label>
                                        <Field component={FieldSelect} options={featuresOptions} name='features'
                                               placeholder={'Room feature'}/>
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
