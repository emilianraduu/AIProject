import React, {useContext} from 'react'
import {BoxContent, BoxHeader, BoxWrapper, HeaderWithIcon} from '../../Global/Box/styles/box'
import {BigPGreyBold, Label} from '../../../styles/typography/typography'
import {DualBoxWrapper, FormItem, StaffFormFooter, StaffFormWrapper} from '../../../styles/shared/form'
import {Field, Form} from 'react-final-form'
import {FieldInput, FieldTextarea} from '../../Global/Input/FieldInput'
import {SecondaryButton, SecondaryButtonDiv} from '../../../styles/shared/button'
import {FILE_ICON} from '../../../styles/abstract/variables'
import {FieldDateAndTimePicker} from "../../Global/DatePickers/FieldDateAndTimePicker";
import {deleteCourse} from "../ActiveCourseActions";
import {AuthContext} from "../../Auth/AuthContext";
import {ActiveRoomContext} from "../../Rooms/ActiveRoomContext";
import {FieldSelect} from "../../Global/Select/FieldSelect";

export default function CourseEditForm({course, onSubmit, type, history}) {
    const authContext = useContext(AuthContext)
    const coursesContext = useContext(ActiveRoomContext)
    const {user} = authContext.state
    console.log(course)
    return (
        <Form
            onSubmit={onSubmit}
            validate={({name}) => {
                const errors = {}
                if (!name) {
                    errors.name = 'Insert course name'
                } else {
                    if (name.length < 5) {
                        errors.name = 'Course name should be >5'
                    }
                }
                return errors
            }}
            initialValues={course}
            render={({handleSubmit, pristine, invalid}) => (
                <form onSubmit={handleSubmit}>
                    <StaffFormWrapper>
                        <div style={{display: 'flex', width: '100%', justifyContent: 'flex-end'}}>
                            <SecondaryButtonDiv filled remove onClick={() => {
                                deleteCourse({id: course.id_class, history, authContext, coursesContext})
                            }}
                            >Remove</SecondaryButtonDiv>
                        </div>
                        <DualBoxWrapper web={type === 'web'}>
                            <BoxWrapper web={type === 'web'} large={type === 'web'}>
                                <BoxHeader>
                                    <HeaderWithIcon flex>
                                        <i className={FILE_ICON}/>
                                        <BigPGreyBold>Edit course</BigPGreyBold>
                                    </HeaderWithIcon>
                                </BoxHeader>
                                <BoxContent>
                                    <FormItem>
                                        <Label>Course name</Label>
                                        <Field component={FieldInput} name='name' placeholder={'Type course name'}/>
                                    </FormItem>
                                    {
                                        !user.isAdmin &&
                                        <>
                                            <FormItem>
                                                <Label>Description</Label>
                                                <Field component={FieldTextarea} name='description'
                                                       placeholder={'Type a description'}/>
                                            </FormItem>

                                            <FormItem>
                                                <Label>Day of the week</Label>
                                                <Field component={FieldSelect} options={[
                                                    {value: 'monday', label: 'Monday'},
                                                    {value: 'tuesday', label: 'Tuesday'},
                                                    {value: 'wednesday', label: 'Wednesday'},
                                                    {value: 'thursday', label: 'Thursday'},
                                                    {value: 'friday', label: 'Friday'},
                                                ]} name='dayoftheweek'
                                                       placeholder={'Select date'}/>
                                            </FormItem>
                                            <FormItem>
                                                <Label>Available from</Label>
                                                <Field component={FieldInput} name='available_from'
                                                       placeholder={'Select date'}/>
                                            </FormItem>
                                            <FormItem>
                                                <Label>Available to</Label>
                                                <Field component={FieldInput} name='available_to'
                                                       placeholder={'Select date'}/>
                                            </FormItem>
                                            <FormItem>
                                                <Label>Duration</Label>
                                                <Field component={FieldInput} name='duration'
                                                       placeholder={'Specify the duration of the course'}/>
                                            </FormItem>
                                            <FormItem>
                                                <Label>Students number</Label>
                                                <Field component={FieldInput} name='studentsNumber'
                                                       placeholder={'Students number'}/>
                                            </FormItem>
                                        </>
                                    }
                                </BoxContent>
                            </BoxWrapper>

                        </DualBoxWrapper>
                        <StaffFormFooter>
                            <FormItem style={{width: 'fit-content'}}>
                                <SecondaryButton filled type={'submit'}
                                                 disabled={pristine || invalid}>Edit</SecondaryButton>
                            </FormItem>
                        </StaffFormFooter>
                    </StaffFormWrapper>
                </form>

            )}
        />
    )
}
