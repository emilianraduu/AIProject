import React from 'react'
import {BoxContent, BoxHeader, BoxWrapper, HeaderWithIcon} from '../../Global/Box/styles/box'
import {BigPGreyBold, Label} from '../../../styles/typography/typography'
import {DualBoxWrapper, FormItem, StaffFormFooter, StaffFormWrapper} from '../../../styles/shared/form'
import {Field, Form} from 'react-final-form'
import {FieldInput} from '../../Global/Input/FieldInput'
import {SecondaryButton} from '../../../styles/shared/button'
import {FILE_ICON} from '../../../styles/abstract/variables'
import Masonry from "react-masonry-component";

export default function TimetableCreateForm({onSubmit, teachers}) {
    return (
        <Form
            onSubmit={onSubmit}
            validate={({name, user}) => {
            }}
            render={({handleSubmit, pristine, invalid}) => (
                <form onSubmit={handleSubmit} style={{width: '100%'}}>
                    <StaffFormWrapper>
                            <Masonry>
                                <BoxWrapper web>
                                    <BoxHeader>
                                        <HeaderWithIcon flex>
                                            <i className={FILE_ICON}/>
                                            <BigPGreyBold>Monday</BigPGreyBold>
                                        </HeaderWithIcon>
                                    </BoxHeader>
                                    <BoxContent>
                                        <FormItem>
                                            <Label>Monday from</Label>
                                            <Field component={FieldInput} name='monday_availability_from'
                                                   placeholder={''}/>
                                        </FormItem>
                                        <FormItem>
                                            <Label>Monday to</Label>
                                            <Field component={FieldInput} name='monday_availability_to'
                                                   placeholder={''}/>
                                        </FormItem>
                                    </BoxContent>
                                </BoxWrapper>
                                <BoxWrapper web>
                                    <BoxHeader>
                                        <HeaderWithIcon flex>
                                            <i className={FILE_ICON}/>
                                            <BigPGreyBold>Tuesday</BigPGreyBold>
                                        </HeaderWithIcon>
                                    </BoxHeader>
                                    <BoxContent>
                                        <FormItem>
                                            <Label>Tuesday from</Label>
                                            <Field component={FieldInput} name='tuesday_availability_from'
                                                   placeholder={''}/>
                                        </FormItem>
                                        <FormItem>
                                            <Label>Tuesday to</Label>
                                            <Field component={FieldInput} name='tuesday_availability_to'
                                                   placeholder={''}/>
                                        </FormItem>
                                    </BoxContent>
                                </BoxWrapper>
                                <BoxWrapper web>
                                    <BoxHeader>
                                        <HeaderWithIcon flex>
                                            <i className={FILE_ICON}/>
                                            <BigPGreyBold>Wednesday</BigPGreyBold>
                                        </HeaderWithIcon>
                                    </BoxHeader>
                                    <BoxContent>
                                        <FormItem>
                                            <Label>Wednesday from</Label>
                                            <Field component={FieldInput} name='wednesday_availability_from'
                                                   placeholder={''}/>
                                        </FormItem>
                                        <FormItem>
                                            <Label>Wednesday to</Label>
                                            <Field component={FieldInput} name='wednesday_availability_to'
                                                   placeholder={''}/>
                                        </FormItem>
                                    </BoxContent>
                                </BoxWrapper>
                                <BoxWrapper web>
                                    <BoxHeader>
                                        <HeaderWithIcon flex>
                                            <i className={FILE_ICON}/>
                                            <BigPGreyBold>Thursday</BigPGreyBold>
                                        </HeaderWithIcon>
                                    </BoxHeader>
                                    <BoxContent>
                                        <FormItem>
                                            <Label>Thursday from</Label>
                                            <Field component={FieldInput} name='thursday_availability_from'
                                                   placeholder={''}/>
                                        </FormItem>
                                        <FormItem>
                                            <Label>Thursday to</Label>
                                            <Field component={FieldInput} name='thursday_availability_to'
                                                   placeholder={''}/>
                                        </FormItem>
                                    </BoxContent>
                                </BoxWrapper>
                                <BoxWrapper web>
                                    <BoxHeader>
                                        <HeaderWithIcon flex>
                                            <i className={FILE_ICON}/>
                                            <BigPGreyBold>Friday</BigPGreyBold>
                                        </HeaderWithIcon>
                                    </BoxHeader>
                                    <BoxContent>
                                        <FormItem>
                                            <Label>Friday from</Label>
                                            <Field component={FieldInput} name='friday_availability_from'
                                                   placeholder={''}/>
                                        </FormItem>
                                        <FormItem>
                                            <Label>Friday to</Label>
                                            <Field component={FieldInput} name='friday_availability_to'
                                                   placeholder={''}/>
                                        </FormItem>
                                    </BoxContent>
                                </BoxWrapper>
                            </Masonry>
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
