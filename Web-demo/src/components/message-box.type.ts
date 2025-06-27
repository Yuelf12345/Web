export type Action = 'confirm' | 'close' | 'cancel'

export type Callback =
  | ((value: string, action: Action) => any)
  | ((action: Action) => any)