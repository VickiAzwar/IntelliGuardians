import React, {useEffect, useState} from 'react';

export const idlFactory = ({ IDL }) => {
    const User = IDL.Record({
      id: IDL.Principal,
      token: IDL.Int,
      username: IDL.Text,
      created_at: IDL.Nat64,
    });

    return IDL.Service({
      create_users: IDL.Func([IDL.Text], [User], []),
      read_users: IDL.Func([], [IDL.Vec(User)], ['query']),
      whoami: IDL.Func([], [IDL.Principal], ['query']),
      read_user_by_id: IDL.Func([IDL.Principal], [IDL.Opt(User)], ['query']),
      upload_image: IDL.Func([IDL.Vec(IDL.Nat8), IDL.Text], [IDL.Text], []),
    });
  };
  

export default idlFactory;
  