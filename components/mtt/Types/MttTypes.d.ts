import { Prisma } from "@prisma/client";
import { QueryClient } from "@tanstack/react-query";

type UtilitiesProp = {
  Create: <T, D>(
    endPoint: string,
    data: T,
    useFetch?: boolean,
    progressPercentage?: React.Dispatch<React.SetStateAction<number>>
  ) => Promise<responseData<D> | null>;
  Read: <T, P = Record<string, unknown>>(
    endPoint: string,
    params?: P,
    useFetch?: boolean
  ) => Promise<T>;
  Upload: <T>(
    endPoint: string,
    formData: T,
    progressPercentage: React.Dispatch<React.SetStateAction<number>>
  ) => Promise<AxiosResponse<any, any>>;
  Update: <T>(
    endPoint: string,
    data: T,
    useFetch?: boolean
  ) => Promise<responseData<T> | null>;
  Delete: <T, P>(
    endPoint: string,
    data?: T,
    useFetch?: boolean
  ) => Promise<responseData<P> | null>;

  QClient: QueryClient;
  PrismaTypes: typeof Prisma;
  toast: ({ ...props }: Toast) => {
    id: string;
    dismiss: () => void;
    update: (props: ToasterToast) => void;
  };
  UserId: string | undefined;
  MttImageFile: ({ className, name, label }: MtImageFileProps) => JSX.Element;
  MttImageDisplay: ({
    className,
    name,
    wathcedValue
  }: {
    wathcedValue?:string,className?:string,name: string;
  }) => JSX.Element;
  ImageReset: (name: string) => void;
  ObjectToFormData:<T extends object>(data: T) => FormData;
  IsLoading:({ children, size, isLoading, className }: {
    children: ReactNode;
    size?: number;
    isLoading: boolean;
    className?: string;
})=> JSX.Element
};

type ActiveUserType = {
    activeName: string;
    activeEmail: string;
    activeImagePath: string;
    activeId: string;
    activeRole;
  };
  
  type navItemProp = {
    name: string;
    icon: React.ReactNode;
    path: string;
    basePath?: string;
  };
  
  type navGeneralItemTopProp = {
    component: React.ReactNode;
  };
  
  type NavConfigProps = {
    navItem: navItemProp[];
    bottomItem?: navGeneralItemTopProp;
    topItem?: navGeneralItemTopProp;
    setIsVisible?: React.Dispatch<React.SetStateAction<boolean>>;
    setIsExpanded?: React.Dispatch<React.SetStateAction<boolean>>;
  };
  
   type LayoutProps = Readonly<{ children: React.ReactNode }>;
  
  type IconText = {
    icon?: React.ReactNode;
    title: React.ReactNode;
    className?: string;
  };
  
  type MtNavItemsProp = {
    icon: React.React.ReactNode;
    path: string;
    label: string;
    basePath: string;
  };
  
  type UploadedImageProps = {
    className?: string;
  };

  type MtNavItemsProp = {
    icon: React.React.ReactNode;
    path: string;
    label: string;
    basePath: string;
  };
  
  type MttImageFileProps = {
    name: string;
    label?: string;
    className?: string;
    trigger?: (videoName: string | null) => React.ReactNode;
    readOnly?: boolean;
  };
  
  type responseData<T> = T;
  
  type TypeArtists = {
    id: string;
    name: string;
    imageUrl: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    userId: string;
  };
  
  type TypeSongs = 
  {
    id: string;
    songTitle: string;
    description: string;
    releaseYear: number;
    artCover: string;
    amount: string;
    likes: number;
    createdAt: string;
    updatedAt: string;
    userId: string;
    artistId: string;
    artist: {
      id: string;
      name: string;
      imageUrl:string;
    };
    user: {
      id: string;
      name: string;
      email: string;
    };
   
  };
  
  type optional<T> ={
  
    [K in keyof T]?:T[K]
  }
  
  type StringsTonumber<T>={
  
    [K in keyof T]:T[K] extends string?number:T[K]
  }


  type SelectValueTypes =  {value:string,label:string,id:string}
  
  