import { BaseMetadata } from "@liveblocks/client";

declare type ShareDocumentParams = {
  roomId: string;
  email: string;
  userType: UserType;
  updateBy: User;
};

declare type UserAvatarProps = {
  user: User;
};

declare type CollaboratorProps = {
  roomId: string;
  creatorId: string;
  email: string;
  collaborator: UserData;
  user: User;
};

declare type ShareModalProps = {
  roomId: string;
  collaborators: UserData[];
  creatorId: string;
  currentUserTpe: UserType;
};

declare type ThreadWrapperProps = {
  thread: ThreadData<BaseMetadata>;
};

declare type RoomMetadata = {
  creatorId: string;
  email: string;
  title: string;
};

declare type RoomCollaborativeProps = {
  roomId: string;
  roomMetaData: RoomMetadata;
  users: UserData[];
  currentUserType: UserType;
};

declare type Doc = {
  id: string;
  name: string;
  createdAt: string;
  metadata: RoomMetadata;
};

declare type User = {
  id: number;
  user: string;
  email: string;
  image: string;
};

declare type UserData = {
  id: number;
  username: string;
  email: string;
  image: string;
  userType: UserType;
};

declare type UserTypeSelectorParams = {
  userType: string;
  setUserType: React.Dispatch<React.SetStateAction<UserType>>;
  onClickHandler?: (value: string) => void;
};

declare type UserType = "editor" | "viewer" | "creator";

declare type AccessType = ["room:write"] | ["room:read", "room:presence:write"];

declare type RoomAccesses = Record<string, AccessType>;
