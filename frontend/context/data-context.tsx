'use client';
import React, { createContext, useEffect } from 'react';

interface ActiveUser {
	id: string;
	name: string;
	email: string;
	role: string;
	initials: string // Optional
}

interface DataContextType {
	activeUser: ActiveUser | null;
	updateActiveUser: (user: ActiveUser | null) => void;
}

const DataContext = createContext<DataContextType>({
	activeUser: null,
	updateActiveUser: () => {},
});

const DataProvider = ({ children }: { children: React.ReactNode }) => {
	const [activeUser, setActiveUser] = React.useState<ActiveUser | null>(null);

	const updateActiveUser = (user: ActiveUser | null) => {
		setActiveUser(user);
	};

    useEffect(() => {
        const storedToken = document.cookie.split('; ').find(row => row.startsWith('token='));
        const storedUser = window.localStorage.getItem('user');
        const user = JSON.parse(storedUser || '{ "id": "", "name": "", "role": "" }');
        user.token = storedToken?.split('=')[1] || '';
        if (storedUser) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setActiveUser(user);
        }
    }, []);

	return (
		<DataContext.Provider value={{ activeUser, updateActiveUser }}>
			{children}
		</DataContext.Provider>
	);
};

const useDataContext = () => React.useContext(DataContext);

export { useDataContext };

export { DataContext, DataProvider };
