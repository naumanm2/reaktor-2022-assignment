export type Drone = {
    serialNumber: DroneElement;
    model: DroneElement;
    manufacturer: DroneElement;
    mac: DroneElement;
    ipv4: DroneElement;
    ipv6: DroneElement;
    firmware: DroneElement;
    positionY: DroneElement;
    positionX: DroneElement;
    altitude: DroneElement;
}

type DroneElement = {
    _text: string;
}

export type DroneFlyer = {
    pilotId: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    createdDt: string;
    email: string;
}
export type Personal = {
    pilotId: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    createdDt: string;
    email: string;
    createdAt: number;
    minimumDistance: number;
}