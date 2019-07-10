export default function (msgOrOpts, err = new Error()) {
  if (_.isEmpty(err) || !_.isError(err)) err = new Error()
  if (_.isString(msgOrOpts)) {
    err.name = 'Error'
    err.message = msgOrOpts
  } else if (
    _.isObject(msgOrOpts) && !_.isArray(msgOrOpts)
  ) {
    let responseJSON
    if (_.has(msgOrOpts, 'responseJSON')) {
      responseJSON = msgOrOpts.responseJSON
      if (_.has(responseJSON, 'name')) msgOrOpts.name = responseJSON.name
      else msgOrOpts.name = 'Error'
      if (_.has(responseJSON, 'message')) msgOrOpts.message = responseJSON.message
      if (_.has(responseJSON, 'code')) msgOrOpts.code = responseJSON.code
    } else if (_.has(msgOrOpts, 'responseText')) {
      msgOrOpts.name = 'Error'
      msgOrOpts.message = msgOrOpts.responseText
    }
    _.extend(err, msgOrOpts)
  }
  return err
}
