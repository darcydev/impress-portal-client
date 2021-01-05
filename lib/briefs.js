import Router from 'next/router';
import Cookie from 'js-cookie';
import axios from 'axios';

const API_URL = process.env.PUBLIC_API_URL;

export const readBriefs = async (route) => {
	const { data } = await axios.get(route);

	if (data.errors) {
		throw new Error(data.errors);
	}

	return data;
};

export const readAllBriefs = async () => {
	return await readBriefs(`${API_URL}/briefs`);
};

export const readBriefById = async (id) => {
	return await readBriefs(`${API_URL}/briefs/${id}`);
};

export const updateBrief = async (id, values) => {
	const token = Cookie.get('token');

	if (!token) {
		Router.push('/login');
		return null;
	}

	const {
		audiences,
		brief_title,
		brief_type,
		brief_project_circumstances,
		brief_project_circumstances_visible,
		brief_desired_outcomes,
		brief_desired_outcomes_visible,
		brief_design_direction,
		brief_design_direction_visible,
		brief_project_delivery,
		brief_project_delivery_visible,
		budget,
		date_approved,
		job,
		key_milestones,
	} = values;

	const { data } = await axios.put(
		`${API_URL}/briefs/${id}`,
		{
			audiences,
			brief_title,
			brief_type,
			budget,
			date_approved,
			job,
			key_milestones,
			brief_project_circumstances,
			brief_project_circumstances_visible,
			brief_desired_outcomes,
			brief_desired_outcomes_visible,
			brief_design_direction,
			brief_design_direction_visible,
			brief_project_delivery,
			brief_project_delivery_visible,
		},
		{
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		}
	);

	if (data.errors) {
		throw new Error(data.errors);
	}

	console.log('data :>> ', data);

	return data;
};

export const createBrief = async () => {
	const token = Cookie.get('token');

	if (!token) {
		Router.push('/login');
		return null;
	}

	const { data } = await axios.post(
		`${API_URL}/briefs`,
		{},
		{
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		}
	);

	if (data.errors) {
		throw new Error(data.errors);
	}

	return data;
};
