export type T_Languages = "Javascript";
export interface I_ObjectGeneral {
  content: string;
  order: number;
}
export interface I_ObjectText extends I_ObjectGeneral {
  type: "text";
  fontSize: number;
  fontFamily: string;
  isBold: boolean;
  isItalic: boolean;
  isUnderlined: boolean;
}
export interface I_ObjectImage extends I_ObjectGeneral {
  type: "image";
  selfHost: boolean;
}
export interface I_ObjectCode extends I_ObjectGeneral {
  type: "code";
  language: T_Languages;
}

export interface I_Test {
  type: "codeIncludes" | "testFinalOutput" | "testFinalOutputJS";
  content: string;
}
