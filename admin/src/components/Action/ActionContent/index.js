import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { DateTimePicker } from '@strapi/design-system';
import { fetchSettings } from '../../../api/settings';

const ActionContent = ({ action, setAction, isDisabled }) => {
	const [step, setStep] = useState(1);

	const handleDateChange = (date) => {
		setAction((prev) => ({
			...prev,
			executeAt: date,
		}));
	};

	const fetchDTPStep = async () => {
		try {
			const stepResponse = await fetchSettings();
			if (stepResponse.data) {
				setStep(stepResponse.data.components.dateTimePicker.step);
			}
		} catch (error) {
			console.error(error);
		}
	};

	const prepareDate = (date) => {
		const timestamp = Date.parse(date);

		if (Number.isNaN(timestamp) === false) {
			return new Date(timestamp);
		}

		return null;
	};

	useEffect(() => {
		fetchDTPStep();
	}, []);

	return (
		<DateTimePicker
			ariaLabel="datetime picker"
			onChange={handleDateeChange}
			value={prepareDate(action.executeAt)}
			disabled={isDisabled}
			step={step}
		/>
	);
};

ActionContent.propTypes = {
	action: PropTypes.shape({
		id: PropTypes.number,
		executeAt: PropTypes.string,
	}),
	setAction: PropTypes.func.isRequired,
	isDisabled: PropTypes.bool.isRequired,
	step: PropTypes.number,
};

export { ActionContent };
