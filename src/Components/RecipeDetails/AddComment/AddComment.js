import { useForm, useContext } from "../../../Hooks/useForm";


export const AddComment = ({onCommentSubmit}) => {
    const [values, handleChange, onSubmit] = useForm({
        comment:""
    }, onCommentSubmit)
    return (
        <article className="create-comment">
            <label>Add new comment:</label>
            <form className="form" onSubmit={onSubmit}>
                <textarea name="comment" placeholder="Comment......" value={values.comment} onChange={handleChange}></textarea>
                <input className="btn submit" type="submit" value="Add Comment" />
            </form>
        </article>
    )
}