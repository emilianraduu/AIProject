import React from 'react'
import {BoxContent, BoxHeader, BoxWrapper, HeaderWithIcon} from '../../Global/Box/styles/box'
import {BigPGreyBold, Label} from '../../../styles/typography/typography'
import {
    DualBoxWrapper,
    FormItem,
    StaffFormFooter,
    StaffFormWrapper
} from '../../../styles/shared/form'
import {Field, Form} from 'react-final-form'
import {FieldInput} from '../../Global/Input/FieldInput'
import {FieldSelect} from '../../Global/Select/FieldSelect'
import {SecondaryButton} from '../../../styles/shared/button'
import {FILE_ICON} from '../../../styles/abstract/variables'

export default function RoomsCrateForm({onSubmit, teachers}) {
    return (
        <Form
            onSubmit={onSubmit}
            validate={({name, user}) => {
                const errors = {}
                if (!name) {
                    errors.name = 'Insert course name'
                } else {
                    if (name.length < 5) {
                        errors.name = 'Course name should be >5'
                    }
                }
                if(!user){
                    errors.user = 'Select teacher'
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
                                        <BigPGreyBold>Create course</BigPGreyBold>
                                    </HeaderWithIcon>
                                </BoxHeader>
                                <BoxContent>
                                    <FormItem>
                                        <Label>Course name</Label>
                                        <Field component={FieldInput} name='name' placeholder={'Type course name'}/>
                                    </FormItem>
                                    <FormItem>
                                        <Label>Teacher</Label>
                                        <Field component={FieldSelect} options={teachers && teachers.map((teacher) => ({
                                            value: teacher.id,
                                            label: `${teacher.firstName} ${teacher.lastName}`
                                        }))} name='user'
                                               placeholder={'Select teacher'}/>
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
