import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';
interface Store {
	sidebartrigger: boolean;
	sidebarAction:boolean
	setSideTrigger: (value: boolean) => void;
	setSideAction: (value: boolean) => void;

}

export const TriggerStore = create<Store>(
(set)=>({
	sidebartrigger:false,
	sidebarAction:false,
	setSideTrigger(sidebartrigger) {
		set((state) => ({
			...state,
			sidebartrigger,
		}));
	},
	setSideAction(sidebarAction) {
		set((state) => ({
			...state,
			sidebarAction,
		}));
	},
}));
