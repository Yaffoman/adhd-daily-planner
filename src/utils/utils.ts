export default class Utils {

    /**
     * This function parses a hours:min:sec string and returns the total seconds
     * @param time - Time in the format of hours:minutes:seconds
     * @returns The total seconds 
     */
    static parseTime(time: string): number {
        const [hours, minutes, seconds] = time.split(':').map(Number);
        return hours * 3600 + minutes * 60 + seconds;
    }

    // Takes in a number of seconds and returns a string in the format of hours:minutes:seconds with no leading zeros
    static formatTime(time: number): string {
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = time % 60;

        return [hours, minutes, seconds]
            .map(v => v.toString().padStart(2, '0')) // pad single digit numbers with 0
            .join(':');
    }
}