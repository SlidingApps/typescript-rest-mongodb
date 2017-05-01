
export class Action {
  public static Result<TResult>(result: TResult, error: any) {
    if (error) {
      throw new Error(error);
    } else {
      return result;
    }
  }
}
