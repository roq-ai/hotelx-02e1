import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createRoom } from 'apiSdk/rooms';
import { Error } from 'components/error';
import { roomValidationSchema } from 'validationSchema/rooms';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { HotelInterface } from 'interfaces/hotel';
import { getHotels } from 'apiSdk/hotels';
import { RoomInterface } from 'interfaces/room';

function RoomCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: RoomInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createRoom(values);
      resetForm();
      router.push('/rooms');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<RoomInterface>({
    initialValues: {
      number: 0,
      type: '',
      status: '',
      hotel_id: (router.query.hotel_id as string) ?? null,
    },
    validationSchema: roomValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Room
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="number" mb="4" isInvalid={!!formik.errors?.number}>
            <FormLabel>Number</FormLabel>
            <NumberInput
              name="number"
              value={formik.values?.number}
              onChange={(valueString, valueNumber) =>
                formik.setFieldValue('number', Number.isNaN(valueNumber) ? 0 : valueNumber)
              }
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            {formik.errors.number && <FormErrorMessage>{formik.errors?.number}</FormErrorMessage>}
          </FormControl>
          <FormControl id="type" mb="4" isInvalid={!!formik.errors?.type}>
            <FormLabel>Type</FormLabel>
            <Input type="text" name="type" value={formik.values?.type} onChange={formik.handleChange} />
            {formik.errors.type && <FormErrorMessage>{formik.errors?.type}</FormErrorMessage>}
          </FormControl>
          <FormControl id="status" mb="4" isInvalid={!!formik.errors?.status}>
            <FormLabel>Status</FormLabel>
            <Input type="text" name="status" value={formik.values?.status} onChange={formik.handleChange} />
            {formik.errors.status && <FormErrorMessage>{formik.errors?.status}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<HotelInterface>
            formik={formik}
            name={'hotel_id'}
            label={'Select Hotel'}
            placeholder={'Select Hotel'}
            fetcher={getHotels}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.name}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'room',
  operation: AccessOperationEnum.CREATE,
})(RoomCreatePage);
