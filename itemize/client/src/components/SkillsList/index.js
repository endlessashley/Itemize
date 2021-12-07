import React from 'react';
import { useMutation } from '@apollo/client';

import { REMOVE_NOVEL } from '../../utils/mutations';
import { QUERY_ME } from '../../utils/queries';

const SkillsList = ({ novels, isLoggedInUser = false }) => {
  const [removeNovel, { error }] = useMutation(REMOVE_NOVEL, {
    update(cache, { data: { removeNovel } }) {
      try {
        cache.writeQuery({
          query: QUERY_ME,
          data: { me: removeNovel },
        });
      } catch (e) {
        console.error(e);
      }
    },
  });

  const handleRemoveNovel = async (novel) => {
    try {
      const { data } = await removeNovel({
        variables: { novel },
      });
    } catch (err) {
      console.error(err);
    }
  };

  if (!novels.length) {
    return <h3>No Novels Yet</h3>;
  }

  return (
    <div>
      <div className="flex-row justify-space-between my-4">
        {novels &&
          novels.map((novel) => (
            <div key={novel} className="col-12 col-xl-6">
              <div className="card mb-3">
                <h4 className="card-header text-light p-2 m-0 display-flex align-center">
                  <span>{novel}</span>
                  {isLoggedInUser && (
                    <button
                      className="btn btn-sm btn-danger ml-auto"
                      onClick={() => handleRemoveNovel(novel)}
                    >
                      X
                    </button>
                  )}
                </h4>
              </div>
            </div>
          ))}
      </div>
      {error && (
        <div className="my-3 p-3 bg-danger text-white">{error.message}</div>
      )}
    </div>
  );
};

export default SkillsList;
