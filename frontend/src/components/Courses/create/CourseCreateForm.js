import React from 'react'
import {BoxContent, BoxHeader, BoxWrapper, HeaderWithIcon} from '../../Global/Box/styles/box'
import {BigPGreyBold, Label} from '../../../styles/typography/typography'
import {DualBoxWrapper, FormItem, StaffFormFooter, StaffFormWrapper} from '../../../styles/shared/form'
import {Field, Form} from 'react-final-form'
import {FieldInput} from '../../Global/Input/FieldInput'
import {FieldSelect} from '../../Global/Select/FieldSelect'
import {SecondaryButton} from '../../../styles/shared/button'
import {FILE_ICON} from '../../../styles/abstract/variables'

export default function CourseCreateForm({onSubmit, teachers}) {
    const featuresOptions=[{value: 'Computers', label: 'Computers'},{value: 'Projector', label: 'Projector'}]
    const typeOptions= [{value: 'Course', label: 'Course'},{value: 'Laboratory', label: 'Laboratory'}]
    const yearOptions = [{value: 'Year1', label: 'Year 1'},{value: 'Year2', label: 'Year 2'},{value: 'Year3', label: 'Year 3'}]
    return (

        <Form
            onSubmit={onSubmit}
            validate={({name, type, year, user,studentsNumber}) => {
                const errors = {}
                if (!name) {
                    errors.name = 'Insert course name'
                } else {
                    if (name.length < 5) {
                        errors.name = 'Course name should be >5'
                    }
                }
                if (!studentsNumber) {
                    errors.studentsNumber = 'Insert students number'
                }
                if (!year) {
                    errors.year = 'Select year'
                }
                if (!type) {
                    errors.type = 'Select type'
                }
                if (!user) {
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
                                        <Label>Students number</Label>
                                        <Field component={FieldInput} name='studentsNumber' placeholder={'Students number'}/>
                                    </FormItem>
                                    <FormItem>
                                        <Label>Year</Label>
                                        <Field component={FieldSelect} options={yearOptions} name='year'
                                               placeholder={'Select Year'}/>
                                    </FormItem>
                                    <FormItem>
                                        <Label>Type</Label>
                                        <Field component={FieldSelect} options={typeOptions} name='type'
                                               placeholder={'Type'}/>
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
